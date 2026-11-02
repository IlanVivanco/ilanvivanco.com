// QA del sitio: build servido con `astro preview` + chequeos en desktop y mobile.
// Uso: npm run qa            (hace build antes)
//      node scripts/qa/check.mjs --no-build
// Falla (exit 1) si hay violaciones de axe, errores de consola o scroll horizontal.
//
// Requiere el navegador de Playwright: npx playwright install chromium

import { spawn, execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const PORT = 4329;
let BASE = `http://localhost:${PORT}`;
const PAGES = ['/', '/curriculum', '/portfolio', '/contacto', '/sobre-mi', '/404'];
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

if (!process.argv.includes('--no-build')) execSync('npx astro build', { stdio: 'inherit' });

// Astro permite un solo preview a la vez: si ya hay uno corriendo, se reutiliza.
const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: ['ignore', 'pipe', 'pipe'] });
let reused = false;
const onOutput = (chunk) => {
  const m = String(chunk).match(/already running at (http:\/\/[^\s"\\]+)/);
  if (m) { BASE = m[1].replace(/\/$/, ''); reused = true; }
};
server.stdout.on('data', onOutput);
server.stderr.on('data', onOutput);
// Astro deja el preview corriendo en segundo plano: si lo arrancamos nosotros, lo paramos explícitamente.
let stopped = false;
const stop = () => {
  if (reused || stopped) return;
  stopped = true;
  try { execSync('npx astro preview stop', { stdio: 'ignore' }); } catch {}
  server.kill('SIGTERM');
};
process.on('exit', stop);

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('astro preview no respondió');
}

let failures = 0;
const log = (ok, msg) => {
  if (!ok) failures++;
  console.log(`${ok ? '✓' : '✗'} ${msg}`);
};

try {
  await waitForServer();
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    // reducedMotion: las animaciones de entrada no ocultan contenido durante el análisis
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.isMobile, reducedMotion: 'reduce' });
    for (const path of PAGES) {
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      await page.goto(BASE + path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      await page.addScriptTag({ content: axeSource });
      const violations = await page.evaluate(async (tags) => {
        const r = await window.axe.run(document, { runOnly: { type: 'tag', values: tags } });
        return r.violations.map((v) => `${v.id} (${v.impact}) ×${v.nodes.length}: ${v.nodes[0].target.join(' ')}`);
      }, AXE_TAGS);

      const label = `${vp.name.padEnd(7)} ${path}`;
      log(violations.length === 0, `${label} axe ${violations.length ? '\n    ' + violations.join('\n    ') : 'ok'}`);
      log(overflow <= 0, `${label} sin scroll horizontal${overflow > 0 ? ` (${overflow}px)` : ''}`);
      // Los recursos que la preview no sirve (p. ej. el PDF del CV pendiente) no cuentan como error de la página
      const real = errors.filter((e) => !/Failed to load resource/.test(e));
      log(real.length === 0, `${label} consola limpia${real.length ? ': ' + real.join(' | ') : ''}`);
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
} catch (e) {
  failures++;
  console.error(e);
} finally {
  stop();
}

console.log(failures ? `\n${failures} chequeo(s) fallaron` : '\nTodo ok');
process.exit(failures ? 1 : 0);
