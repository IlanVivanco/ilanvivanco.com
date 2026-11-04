// Genera una imagen OG por página, con el estilo de public/og.png.
// Sale a public/og/ (para `astro dev`) y a dist/og/ (para este deploy).
import { copyFile, mkdir, readFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { publicPages } from '../../src/data/pages.ts'
import { serveDist } from '../lib/serve-dist.mjs'

const esc = (v) => v.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const logo = await readFile('public/favicon.svg', 'utf8')

// Hasta 30 caracteres, una línea. Más largo, dos líneas de 56 px, que entran antes del subtítulo.
const titleSize = (title) => (title.length > 30 ? 56 : title.length > 18 ? 76 : 96)

const html = ({ fn, title, subtitle }) => `<!doctype html><html lang="es"><meta charset="utf-8"><style>
  @font-face { font-family: 'Space Grotesk'; src: url('/fonts/space-grotesk.woff2') format('woff2'); font-weight: 300 700; }
  @font-face { font-family: 'Fira Code'; src: url('/fonts/fira-code.woff2') format('woff2'); font-weight: 300 700; }
  * { margin: 0; box-sizing: border-box; }
  body { position: relative; width: 1200px; height: 630px; overflow: hidden; padding: 80px; background: #0A111F; color: #F4F9FC; font-family: 'Fira Code', monospace; font-variant-ligatures: none; }
  body::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 84% 25%, rgb(44 151 159 / 0.2), transparent 42%); }
  body::after { content: ''; position: absolute; inset: 0 0 0 55%; background: radial-gradient(rgb(142 156 184 / 0.25) 1px, transparent 1px) 0 0 / 28px 28px; mask-image: radial-gradient(circle at 53% 25%, #000, transparent 70%); }
  .logo, .fn, h1, .sub, .foot { position: absolute; left: 80px; z-index: 1; }
  .logo { top: 80px; width: 96px; line-height: 0; }
  .fn { top: 218px; font-size: 30px; }
  .arrow { color: #55C9D1; } .paren { color: #EE7650; } .semi { color: #8E9CB8; }
  h1 { top: 268px; width: 1040px; font: 700 ${titleSize(title)}px/1.1 'Space Grotesk', sans-serif; letter-spacing: -0.04em; ${title.length > 30 ? '' : 'white-space: nowrap; '}}
  .sub { top: 408px; font-size: 30px; color: #D8BD2D; }
  .foot { top: 520px; right: 80px; display: flex; justify-content: space-between; font-size: 24px; color: #8E9CB8; }
</style>
<div class="logo">${logo}</div>
<p class="fn"><span class="arrow">-&gt;</span>${esc(fn)}<span class="paren">()</span><span class="semi">;</span></p>
<h1>${esc(title)}</h1>
<p class="sub">${esc(subtitle)}</p>
<div class="foot"><span>Ilán Vivanco · CTO en EpicDevs</span><span>ilanvivanco.com</span></div>
</html>`

const server = await serveDist()
const browser = await chromium.launch()
try {
	await mkdir('public/og', { recursive: true })
	await mkdir('dist/og', { recursive: true })
	const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
	await page.goto(`${server.url}/robots.txt`)
	for (const p of publicPages.filter((p) => p.path !== '/')) {
		await page.setContent(html(p), { waitUntil: 'networkidle' })
		await page.evaluate(() => document.fonts.ready)
		await page.screenshot({ path: `public/og/${p.slug}.png` })
		await copyFile(`public/og/${p.slug}.png`, `dist/og/${p.slug}.png`)
		console.log(`✓ public/og/${p.slug}.png`)
	}
} finally {
	await browser.close()
	server.close()
}
