// Posts del blog: un archivo por post en src/content/blog/<slug>.md, con front matter de `clave: "valor"`.
// Este módulo lo lee con fs porque también lo usan el sitemap, las imágenes OG y la QA, que corren fuera de Astro.
// `date` y `updated` son YYYY-MM-DD. `updated` se cambia en el bump de versión, si cambió el contenido.
import { readdirSync, readFileSync } from 'node:fs'

const DIR = 'src/content/blog'
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

export type Post = { slug: string; fn: string } & Record<(typeof FIELDS)[number], string>

const readPost = (file: string): Post => {
	const slug = file.replace(/\.md$/, '')
	const block = readFileSync(`${DIR}/${file}`, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
	const data = Object.fromEntries(
		block.split('\n').map((line) => {
			const field = line.match(/^(\w+):\s*(".*")$/)
			if (!field) throw new Error(`${file}: front matter inválido en «${line}»`)
			return [field[1], JSON.parse(field[2])]
		})
	)
	const missing = FIELDS.filter((f) => !data[f])
	if (missing.length) throw new Error(`${file}: faltan ${missing.join(', ')}`)
	return { ...(data as Record<(typeof FIELDS)[number], string>), slug, fn: slug.replace(/-/g, '_') }
}

// Del más nuevo al más viejo.
export const posts: Post[] = readdirSync(DIR)
	.filter((f) => f.endsWith('.md'))
	.map(readPost)
	.sort((a, b) => b.date.localeCompare(a.date))

const dateFormat = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
export const formatPostDate = (date: string) => dateFormat.format(new Date(`${date}T12:00:00Z`))

// Las variantes las genera scripts/build/project-images.mjs. La original mide 1440 px.
export const coverSrcset = (p: Post) =>
	[480, 720].map((w) => `${p.image.replace(/\.webp$/, `-${w}.webp`)} ${w}w`).join(', ') + `, ${p.image} 1440w`
