// QA del sitio: build servido localmente + chequeos en desktop y mobile.
// Uso: npm run qa            (hace build antes)
//      node scripts/qa/check.mjs --no-build
// Falla (exit 1) si hay violaciones de axe, errores de consola, scroll horizontal,
// o si falla algún chequeo del build (ver static.mjs), del formulario (form.mjs) o del CV.
//
// Requiere el navegador de Playwright: npx playwright install chromium

import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { chromium } from 'playwright'
import { emailFor } from '../../src/data/site.ts'
import { posts } from '../../src/data/posts.ts'
import { studiesFor } from '../../src/data/projects.ts'
import { serveDist } from '../lib/serve-dist.mjs'
import { runAnalyticsChecks } from './analytics.mjs'
import { runFormChecks, runFormViewportCheck } from './form.mjs'
import { runInteractionChecks } from './interactions.mjs'
import { runStaticChecks } from './static.mjs'

const require = createRequire(import.meta.url)
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')

const PAGES = [
	'/',
	'/curriculum',
	'/portfolio',
	...studiesFor('es').map((p) => `/portfolio/${p.slug}`),
	'/blog',
	...posts.map((p) => `/blog/${p.slug}`),
	'/contacto',
	'/sobre-mi',
	'/privacidad',
	'/404',
]
const VIEWPORTS = [
	{ name: 'desktop', width: 1440, height: 900, isMobile: false },
	{ name: 'mobile', width: 390, height: 844, isMobile: true },
]
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']

if (!process.argv.includes('--no-build')) execSync('npm run build', { stdio: 'inherit' })

const server = await serveDist()
const BASE = server.url

let failures = 0
const log = (ok, msg) => {
	if (!ok) failures++
	console.log(`${ok ? '✓' : '✗'} ${msg}`)
}

try {
	await runStaticChecks(log)

	const browser = await chromium.launch()
	for (const vp of VIEWPORTS) {
		// reducedMotion: las animaciones de entrada no ocultan contenido durante el análisis
		const ctx = await browser.newContext({
			viewport: { width: vp.width, height: vp.height },
			isMobile: vp.isMobile,
			hasTouch: vp.isMobile,
			reducedMotion: 'reduce',
		})
		for (const path of PAGES) {
			const page = await ctx.newPage()
			const errors = []
			page.on('pageerror', (e) => errors.push(e.message))
			page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
			await page.goto(BASE + path, { waitUntil: 'networkidle' })
			await page.waitForTimeout(400)

			const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
			await page.addScriptTag({ content: axeSource })
			const violations = await page.evaluate(async (tags) => {
				const r = await window.axe.run(document, { runOnly: { type: 'tag', values: tags } })
				return r.violations.map((v) => `${v.id} (${v.impact}) ×${v.nodes.length}: ${v.nodes[0].target.join(' ')}`)
			}, AXE_TAGS)

			const label = `${vp.name.padEnd(7)} ${path}`
			log(violations.length === 0, `${label} axe ${violations.length ? '\n    ' + violations.join('\n    ') : 'ok'}`)
			log(overflow <= 0, `${label} sin scroll horizontal${overflow > 0 ? ` (${overflow}px)` : ''}`)
			// /404 responde 404 a propósito: ese request no es un error de la página
			const real = errors.filter((e) => !(path === '/404' && /Failed to load resource/.test(e)))
			log(real.length === 0, `${label} consola limpia${real.length ? ': ' + real.join(' | ') : ''}`)
			await page.close()
		}
		if (vp.name === 'desktop') await runFormChecks(ctx, BASE, emailFor('es'), log)
		else await runFormViewportCheck(ctx, BASE, log)
		await ctx.close()
	}
	await runInteractionChecks(browser, BASE, axeSource, AXE_TAGS, log)
	await runAnalyticsChecks(browser, log)
	await browser.close()
} catch (e) {
	failures++
	console.error(e)
} finally {
	server.close()
}

console.log(failures ? `\n${failures} chequeo(s) fallaron` : '\nTodo ok')
process.exit(failures ? 1 : 0)
