// Lighthouse sobre el último build, en mobile y desktop. Mide antes de pushear: no corre en el CI.
// Uso: npm run build && npm run lighthouse
//
// Requiere el navegador de Playwright: npx playwright install chromium

import { spawnSync } from 'node:child_process'
import { chromium } from 'playwright'

const env = { ...process.env, CHROME_PATH: chromium.executablePath() }

for (const [name, flags] of [
	['mobile', []],
	['desktop', ['--collect.settings.preset=desktop']],
]) {
	console.log(`\nLighthouse en ${name}`)
	const { status } = spawnSync('npx', ['--yes', '@lhci/cli@0.15', 'autorun', ...flags], { env, stdio: 'inherit' })
	if (status !== 0) process.exit(status ?? 1)
}
