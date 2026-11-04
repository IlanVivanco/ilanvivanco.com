// Lighthouse sobre el último build, en mobile y desktop. Mide antes de pushear: no corre en el CI.
// Uso: npm run build && npm run lighthouse
//      npm run lighthouse -- --collect.url=http://localhost:8800/blog   (una sola página)
//
// Requiere el navegador de Playwright: npx playwright install chromium

import { spawnSync } from 'node:child_process'
import { readdirSync, rmSync } from 'node:fs'
import { chromium } from 'playwright'

const env = { ...process.env, CHROME_PATH: chromium.executablePath() }
const extra = process.argv.slice(2)

let failed = 0
for (const [name, flags] of [
	['mobile', []],
	['desktop', ['--collect.settings.preset=desktop']],
]) {
	console.log(`\nLighthouse en ${name}`)
	const { status } = spawnSync('npx', ['--yes', '@lhci/cli@0.15', 'autorun', ...flags, ...extra], {
		env,
		stdio: 'inherit',
	})
	failed = status ?? 1
	if (failed) break
}

// En WSL, chrome-launcher deja carpetas temporales con nombre de Windows en el directorio actual
for (const entry of readdirSync('.')) {
	if (/^C:\\.*\\lighthouse\.\w+$/.test(entry)) rmSync(entry, { recursive: true, force: true })
}
process.exit(failed)
