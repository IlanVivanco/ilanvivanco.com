// Posts del blog: un archivo por post en src/content/blog/<slug>.md (y en blog-en/ en inglés), con front matter de `clave: "valor"`.
// En inglés, `source` es el slug del post en español.
// Este módulo lo lee con fs porque también lo usan el sitemap, las imágenes OG y la QA, que corren fuera de Astro.
// `date` y `updated` son YYYY-MM-DD. `updated` se cambia en el bump de versión, si cambió el contenido.
import { ui } from '../i18n/index.ts'
import { readdirSync, readFileSync } from 'node:fs'

const DIRS = { es: 'src/content/blog', en: 'src/content/blog-en' }
const FIELDS = [
	'title',
	'subtitle',
	'description',
	'date',
	'updated',
	'image',
	'imageAlt',
	'ctaTitle',
	'ctaLabel',
] as const

export type Post = { slug: string; fn: string; lang: 'es' | 'en'; source?: string } & Record<
	(typeof FIELDS)[number],
	string
>

const readPost = (lang: 'es' | 'en', file: string): Post => {
	const slug = file.replace(/\.md$/, '')
	const block = readFileSync(`${DIRS[lang]}/${file}`, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
	const data = Object.fromEntries(
		block.split('\n').map((line) => {
			const field = line.match(/^(\w+):\s*(".*")$/)
			if (!field) throw new Error(`${file}: front matter inválido en «${line}»`)
			return [field[1], JSON.parse(field[2])]
		})
	)
	const missing = FIELDS.filter((f) => !data[f])
	if (missing.length) throw new Error(`${file}: faltan ${missing.join(', ')}`)
	return {
		...(data as Record<(typeof FIELDS)[number], string>),
		slug,
		fn: slug.replace(/-/g, '_'),
		lang,
		source: data.source,
	}
}

// Del más nuevo al más viejo.
const read = (lang: 'es' | 'en') =>
	readdirSync(DIRS[lang])
		.filter((f) => f.endsWith('.md'))
		.map((f) => readPost(lang, f))
		.sort((a, b) => b.date.localeCompare(a.date))

export const posts = read('es')
const postsEn = read('en')
export const postsFor = (locale?: string) => (locale === 'en' ? postsEn : posts)
export const postPath = (p: Post) => `${p.lang === 'en' ? '/en' : ''}/blog/${p.slug}`
// La misma nota en el otro idioma, si existe.
export const postAlternate = (p: Post) =>
	p.lang === 'en' ? posts.find((o) => o.slug === p.source) : postsEn.find((o) => o.source === p.slug)

export const formatPostDate = (date: string, locale?: string) =>
	new Intl.DateTimeFormat(ui(locale).intl, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
		new Date(`${date}T12:00:00Z`)
	)

// Las variantes las genera scripts/build/project-images.mjs. La original mide 1440 px.
export const coverSrcset = (p: Post) =>
	[480, 720].map((w) => `${p.image.replace(/\.webp$/, `-${w}.webp`)} ${w}w`).join(', ') + `, ${p.image} 1440w`
