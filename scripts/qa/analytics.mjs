// El beacon se carga solo después de `load`, nunca durante un pre-render y sin dejar cookies.
// Compila con un token de prueba en un directorio aparte y simula el script de Cloudflare.
import { execSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import { serveDist } from '../lib/serve-dist.mjs'

const OUT = '.astro/qa-beacon'
const BEACON = 'https://static.cloudflareinsights.com/beacon.min.js'

export async function runAnalyticsChecks(browser, log) {
	execSync(`npx astro build --outDir ${OUT}`, {
		stdio: 'ignore',
		env: { ...process.env, PUBLIC_CF_BEACON_TOKEN: 'qa-token' },
	})
	const server = await serveDist(OUT)
	const ctx = await browser.newContext()
	await ctx.route(BEACON, (route) => route.fulfill({ contentType: 'text/javascript', body: '' }))
	const beaconTag = (page) => page.locator(`script[src="${BEACON}"]`)
	try {
		const page = await ctx.newPage()
		await page.goto(server.url, { waitUntil: 'load' })
		await beaconTag(page).waitFor({ state: 'attached', timeout: 5000 })
		log(
			(await beaconTag(page).getAttribute('data-cf-beacon')) === '{"token":"qa-token"}',
			'analytics: beacon con el token'
		)
		log((await ctx.cookies()).length === 0, 'analytics: sin cookies')
		await page.close()

		const pre = await ctx.newPage()
		await pre.addInitScript(() =>
			Object.defineProperty(document, 'prerendering', { configurable: true, get: () => !window.__activated })
		)
		await pre.goto(server.url, { waitUntil: 'load' })
		await pre.waitForTimeout(500)
		log((await beaconTag(pre).count()) === 0, 'analytics: no carga durante el pre-render')
		await pre.evaluate(() => {
			window.__activated = true
			document.dispatchEvent(new Event('prerenderingchange'))
		})
		await beaconTag(pre).waitFor({ state: 'attached', timeout: 5000 })
		log(true, 'analytics: carga al activarse la página')
		await pre.close()
	} finally {
		await ctx.close()
		server.close()
		rmSync(OUT, { recursive: true, force: true })
	}
}
