// Chequeos sobre lo que sale del build, sin navegador: email, analytics, SEO, redirects, presupuestos y CV.
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'
import { createRequire } from 'node:module'
import { PDFDocument, PDFName } from 'pdf-lib'
import { cv, cvLabels, atsPeriod } from '../../src/data/cv.ts'
import { publicPages, ogPath } from '../../src/data/pages.ts'
import { site, statScreens } from '../../src/data/site.ts'
import { parsePost } from '../lib/instagram-post.mjs'

const require = createRequire(import.meta.url)
const { PDFParse } = require('pdf-parse')

const DIST = 'dist'
const JS_BUDGET_KB = 10
const read = (f) => readFileSync(join(DIST, f), 'utf8')
const walk = (dir = '') =>
	readdirSync(join(DIST, dir), { withFileTypes: true }).flatMap((e) =>
		e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
	)
const htmlFiles = () => walk().filter((f) => f.endsWith('.html'))
const fileFor = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`)

// Toda URL pública vieja tiene destino. Inventario y motivos en MIGRATION.md.
const REDIRECTS = {
	'/aniversario': 'https://gifrases.ilanvivanco.com/',
	'/about': '/sobre-mi',
	'/resume': '/curriculum',
	'/contact': '/contacto',
	'/contact-me': '/contacto',
	'/portfolio/:slug': '/portfolio',
	'/blog': '/',
	'/blog/*': '/',
	'/en': '/',
	'/en/*': '/',
	'/en/about': '/sobre-mi',
	'/en/resume': '/curriculum',
	'/en/contact': '/contacto',
	'/en/portfolio': '/portfolio',
	'/en/portfolio/*': '/portfolio',
	'/en/blog/*': '/',
	'/images/ilan-vivanco-social-card.png': '/og.png',
	'/images/ilan-vivanco.jpg': '/img/ilan-800.webp',
	'/images/ilan-vivanco-square.jpg': '/img/ilan-sq-480.webp',
	'/images/ilan-vivanco-logo.png': '/favicon.svg',
	'/images/favicon.png': '/favicon.svg',
}

const jsWeight = (file) => {
	const html = read(file)
	const inline = [
		...html.matchAll(
			/<script(?![^>]*\b(?:type="(?:speculationrules|application\/ld\+json)"|src=))[^>]*>([\s\S]*?)<\/script>/g
		),
	]
		.map((m) => m[1])
		.join('')
	const external = [...html.matchAll(/<script[^>]*\bsrc="(\/_astro\/[^"]+\.js)"/g)].map((m) => m[1])
	// Módulos importados por los scripts de entrada
	const seen = new Set()
	const visit = (src) => {
		if (seen.has(src)) return
		seen.add(src)
		for (const m of read(src.slice(1)).matchAll(/(?:from\s*|import\s*)["']\.\/([^"']+\.js)["']/g))
			visit(`/_astro/${m[1]}`)
	}
	external.forEach(visit)
	const gz = (s) => gzipSync(s).length
	return gz(inline) + [...seen].reduce((n, src) => n + gz(read(src.slice(1))), 0)
}

export async function runStaticChecks(log) {
	// Email
	const email = site.email
	log(!email.startsWith('['), 'email real en site.ts')
	const leaks = htmlFiles().filter((f) => read(f).includes(email))
	log(leaks.length === 0, `email fuera de todo el HTML de dist${leaks.length ? ': ' + leaks.join(', ') : ''}`)

	// Analytics
	const ga = htmlFiles().filter((f) => /G-7CJGME4GRL|googletagmanager|gtag\(/.test(read(f)))
	log(ga.length === 0, `sin Google Analytics${ga.length ? ': ' + ga.join(', ') : ''}`)

	// Formulario: Netlify lo detecta en el HTML estático
	const contact = read('contacto.html')
	log(
		/<form[^>]*name="?contact-form"?/.test(contact) &&
			/data-netlify="?true"?/.test(contact) &&
			/netlify-honeypot="?fake"?/.test(contact),
		'form contact-form con data-netlify y honeypot en el HTML'
	)
	log(
		['form-name', 'subject', 'name', 'email', 'tema', 'message', 'fake'].every((n) =>
			new RegExp(`name="?${n}"?[\\s>/]`).test(contact)
		),
		'campos del form con los nombres que espera Netlify'
	)
	log(contact.includes('href="/privacidad"'), 'el form enlaza a /privacidad')

	// Links externos en otra pestaña
	const sameTab = htmlFiles()
		.filter((f) => !f.startsWith('cv/'))
		.flatMap((f) =>
			[...read(f).matchAll(/<a\b[^>]*\bhref="https?:[^>]*>/g)]
				.filter((m) => !/target="_blank"/.test(m[0]) || !/rel="noopener"/.test(m[0]))
				.map((m) => `${f}: ${m[0]}`)
		)
	log(
		sameTab.length === 0,
		`links externos con target=_blank y noopener${sameTab.length ? ': ' + sameTab.join(', ') : ''}`
	)

	// Instagram: fotos propias, sin requests a terceros desde el navegador
	const post = {
		id: '123',
		permalink: 'https://www.instagram.com/p/x/',
		timestamp: '2024-10-03T07:41:47+0000',
		sizes: { medium: { mediaUrl: 'https://example.com/a.jpg' } },
		hashtags: ['Lago', '<b>', 'Andes', 'Extra'],
	}
	const parsed = parsePost(post)
	log(
		parsed?.date === '2024-10-03T07:41:47.000Z' && parsed.tags.join() === 'Lago,Andes',
		'Instagram: normaliza fecha y hashtags'
	)
	const invalid = [{ timestamp: 'invalid-date' }, { id: '' }, { permalink: 'https://evil.example/' }, { sizes: {} }]
	log(
		invalid.every((bad) => parsePost({ ...post, ...bad }) === null) && parsePost(null) === null,
		'Instagram: omite posts inválidos'
	)
	const about = read('sobre-mi.html')
	const remote = htmlFiles().filter(
		(f) => /<img\b[^>]*\bsrc="https?:/.test(read(f)) || /behold\.pictures|cdninstagram/.test(read(f))
	)
	log(remote.length === 0, `sin imágenes de terceros${remote.length ? ': ' + remote.join(', ') : ''}`)
	const igPhotos = [...about.matchAll(/src="(\/img\/instagram\/[^"]+)"/g)].map((m) => m[1])
	log(
		igPhotos.every((src) => existsSync(join(DIST, src))),
		`las ${igPhotos.length} fotos de Instagram existen en dist`
	)
	if (igPhotos.length === 0) console.warn('⚠ /sobre-mi se generó sin fotos de Instagram')

	// Un formateador puede separar un link de su puntuación ("EpicDevs .")
	const spaced = htmlFiles().filter((f) => !f.startsWith('cv/') && /<\/a>\s+[.,;:]/.test(read(f)))
	log(spaced.length === 0, `links pegados a su puntuación${spaced.length ? ': ' + spaced.join(', ') : ''}`)

	// Voz: sin raya larga en lo que se publica
	const offVoice = htmlFiles().filter((f) => /—/.test(read(f).replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '')))
	log(offVoice.length === 0, `sin raya larga${offVoice.length ? ': ' + offVoice.join(', ') : ''}`)

	// SEO
	const sitemap = read('sitemap.xml')
	log(
		publicPages
			.filter((p) => !p.noindex)
			.every((p) => sitemap.includes(`<loc>${new URL(p.path, site.url).href}</loc><lastmod>${p.updated}</lastmod>`)),
		'sitemap con las páginas indexables y su lastmod'
	)
	log(
		publicPages
			.filter((p) => p.noindex)
			.every((p) => !sitemap.includes(`<loc>${new URL(p.path, site.url).href}</loc>`)),
		'sitemap sin páginas noindex'
	)
	for (const icon of ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'manifest.webmanifest']) {
		log(existsSync(join(DIST, icon)), `${icon} publicado`)
	}
	log(
		htmlFiles()
			.filter((f) => !f.startsWith('cv/'))
			.every((f) => !/<img\b(?![^>]*\bsrcset=)[^>]*\bsrc="\/img\/(?:projects|instagram)\//.test(read(f))),
		'fotos de proyectos e Instagram con srcset'
	)
	log(!sitemap.includes('/cv/') && !sitemap.includes('/404'), 'sitemap sin /cv ni 404')
	for (const p of publicPages) {
		const html = read(fileFor(p.path))
		const canonical = new URL(p.path, site.url).href
		if (p.noindex) log(html.includes('name="robots" content="noindex, follow"'), `${p.path} noindex, follow`)
		else {
			log(html.includes(`rel="canonical" href="${canonical}"`), `${p.path} canonical`)
			const graph =
				JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1] ?? '{}')['@graph'] ?? []
			log(graph.some((n) => n['@type'] === 'Person') && graph.some((n) => n.url === canonical), `${p.path} JSON-LD`)
			log(!JSON.stringify(graph).includes(site.email), `${p.path} JSON-LD sin email`)
		}
		log(
			html.includes(`content="${new URL(ogPath(p.path), site.url).href}"`) && existsSync(join(DIST, ogPath(p.path))),
			`${p.path} og:image propia y existente`
		)
	}
	log(
		htmlFiles()
			.filter((f) => f.startsWith('cv/'))
			.every((f) => read(f).includes('name="robots" content="noindex')),
		'/cv con noindex'
	)
	log(
		!publicPages.some((p) => p.path.startsWith('/cv')) &&
			htmlFiles()
				.filter((f) => !f.startsWith('cv/'))
				.every((f) => !read(f).includes('href="/cv/es"')),
		'sin links a /cv/es desde el sitio'
	)

	// Redirects
	const toml = readFileSync('netlify.toml', 'utf8')
	const rules = Object.fromEntries(
		[...toml.matchAll(/from = "([^"]+)"\nto = "([^"]+)"\nstatus = (\d+)/g)].map((m) => [
			m[1],
			{ to: m[2], status: m[3] },
		])
	)
	const missing = Object.entries(REDIRECTS).filter(
		([from, to]) => rules[from]?.to !== to || rules[from]?.status !== '301'
	)
	log(
		missing.length === 0,
		`redirects 301 de las URLs viejas${missing.length ? ': faltan ' + missing.map(([f]) => f).join(', ') : ''}`
	)
	log(
		Object.values(REDIRECTS)
			.filter((to) => to.startsWith('/'))
			.every((to) => to === '/' || existsSync(join(DIST, to)) || existsSync(join(DIST, `${to}.html`))),
		'los destinos de los redirects existen'
	)
	log((toml.match(/force = true/g) ?? []).length === 2, 'solo /aniversario y netlify.app usan force')
	log(toml.includes('from = "https://ilanvivanco.netlify.app/*"'), 'netlify.app redirige al dominio principal')
	for (const header of [
		'X-Content-Type-Options',
		'X-Frame-Options',
		'Referrer-Policy',
		'Permissions-Policy',
		'Content-Security-Policy',
	]) {
		log(toml.includes(`${header} =`), `cabecera ${header}`)
	}
	log(/for = "\/_astro\/\*"[\s\S]*?immutable/.test(toml), '/_astro con caché immutable')

	// Presupuesto y stats honestos
	for (const f of htmlFiles().filter((f) => !f.startsWith('cv/'))) {
		const kb = jsWeight(f) / 1024
		log(kb <= JS_BUDGET_KB, `${f} JS propio ${kb.toFixed(1)} KB gz (máx. ${JS_BUDGET_KB})`)
	}
	const homeKb = jsWeight('index.html') / 1024
	const stat = statScreens.flatMap((s) => s.items).find((i) => i.label.includes('JavaScript'))
	log(Math.abs(stat.value - homeKb) <= 0.5, `el stat dice ${stat.value} KB y la home pesa ${homeKb.toFixed(1)} KB`)

	// CV para ATS
	for (const lang of Object.keys(cv)) await checkPdf(lang, log)
}

async function checkPdf(lang, log) {
	const file = join(DIST, 'cv', `ilan-vivanco-cv-${lang}.pdf`)
	if (!existsSync(file)) return log(false, `CV ${lang}: falta ${file}`)
	const bytes = readFileSync(file)
	const parser = new PDFParse({ data: bytes })
	const { text, total } = await parser.getText()
	await parser.destroy()
	const flat = text.replace(/\s+/g, ' ')
	const data = cv[lang]
	const labels = cvLabels[lang]

	log(total <= 2, `CV ${lang}: ${total} página(s), máx. 2`)
	const { summary, experience, skills, education, languages } = labels.headings
	const order = [
		site.name,
		labels.title,
		site.email,
		'linkedin.com/in/ilanvivanco',
		'ilanvivanco.com',
		summary,
		experience,
		skills,
		education,
		languages,
	].map((h) => flat.indexOf(h))
	log(
		order.every((n, i) => n >= 0 && (i === 0 || n > order[i - 1])),
		`CV ${lang}: orden de lectura de las secciones`
	)

	const roles = [
		...data.experience.flatMap((j) =>
			j.roles.map((r) => ({ title: r.title, org: j.org, when: atsPeriod(r, labels.present) }))
		),
		...data.earlier.map((j) => ({ title: j.title, org: j.org, when: atsPeriod(j, labels.present) })),
	]
	const lost = roles.filter((r) => !flat.includes(r.title) || !flat.includes(r.org) || !flat.includes(r.when))
	log(
		lost.length === 0,
		`CV ${lang}: ${roles.length} cargos con empresa y fechas${lost.length ? '; faltan: ' + lost.map((r) => r.title).join(', ') : ''}`
	)

	const lastRole = flat.lastIndexOf(data.earlier.at(-1).title)
	log(lastRole >= 0 && lastRole < flat.indexOf(skills), `CV ${lang}: los cargos se leen antes que las habilidades`)
	log(!bytes.includes('/Type3'), `CV ${lang}: fuentes embebidas, sin Type 3`)

	const pdf = await PDFDocument.load(bytes, { updateMetadata: false })
	log(!!pdf.catalog.get(PDFName.of('StructTreeRoot')), `CV ${lang}: PDF etiquetado`)
	log(!!pdf.catalog.get(PDFName.of('Outlines')), `CV ${lang}: con outline`)
	log(pdf.getTitle()?.includes(site.name) && pdf.getAuthor() === site.name, `CV ${lang}: título y autor`)
}
