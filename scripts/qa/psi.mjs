// PageSpeed Insights sobre producción, en mobile y desktop. Es la referencia del presupuesto de Lighthouse.
// Uso: npm run psi                  (todas las páginas públicas)
//      npm run psi -- /contacto     (solo esas)
//
// Requiere PSI_API_KEY en .env. Falla (exit 1) si una categoría baja de 99 o si el CLS pasa de 0,1.

import { publicPages } from '../../src/data/pages.ts'

const API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const BASE = 'https://ilanvivanco.com'
const MIN_SCORE = 99
const MAX_CLS = 0.1
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo']
const STRATEGIES = ['mobile', 'desktop']
const CONCURRENCY = 4

const key = process.env.PSI_API_KEY
if (!key) {
	console.error('Falta PSI_API_KEY en .env')
	process.exit(1)
}

const paths = process.argv.slice(2)
const pages = paths.length ? paths : publicPages.filter((p) => !p.noindex).map((p) => p.path)
const jobs = pages.flatMap((path) => STRATEGIES.map((strategy) => ({ path, strategy })))

const measure = async ({ path, strategy }) => {
	const params = new URLSearchParams({ url: BASE + path, strategy, key })
	for (const category of CATEGORIES) params.append('category', category)
	const res = await fetch(`${API}?${params}`, { signal: AbortSignal.timeout(170_000) })
	// El mensaje de error de la API, nunca la URL: lleva la key.
	if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.json()).error?.message}`)
	const { categories, audits } = (await res.json()).lighthouseResult
	return {
		scores: CATEGORIES.map((c) => Math.round(categories[c].score * 100)),
		lcp: audits['largest-contentful-paint'].numericValue,
		cls: audits['cumulative-layout-shift'].numericValue,
		shifted: audits['layout-shifts']?.details?.items?.[0]?.node?.selector,
	}
}

let next = 0
let failures = 0
const worker = async () => {
	while (next < jobs.length) {
		const job = jobs[next++]
		const label = `${job.path.padEnd(36)} ${job.strategy.padEnd(7)}`
		try {
			const { scores, lcp, cls, shifted } = await measure(job)
			const ok = scores.every((s) => s >= MIN_SCORE) && cls <= MAX_CLS
			if (!ok) failures++
			console.log(
				`${ok ? '✓' : '✗'} ${label} ${scores.join(' ')}  LCP ${(lcp / 1000).toFixed(2)} s  CLS ${cls.toFixed(4)}${shifted ? `  ${shifted}` : ''}`
			)
		} catch (e) {
			failures++
			console.log(`✗ ${label} ${e.message}`)
		}
	}
}

console.log(`Orden de las notas: ${CATEGORIES.join(', ')}\n`)
await Promise.all(Array.from({ length: CONCURRENCY }, worker))
console.log(failures ? `\n${failures} medición(es) fuera de presupuesto` : '\nTodo ok')
process.exit(failures ? 1 : 0)
