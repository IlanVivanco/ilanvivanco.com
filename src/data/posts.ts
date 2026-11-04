// Posts del blog. El cuerpo vive en src/content/blog/<slug>.md, sin frontmatter: estos datos los leen también
// el sitemap, las imágenes OG y la QA, que corren fuera de Astro.
// `date` y `updated` son YYYY-MM-DD. `updated` se cambia en el bump de versión, si cambió el contenido.

export type Post = {
	slug: string
	fn: string
	title: string
	subtitle: string
	description: string
	date: string
	updated: string
}

export const posts: Post[] = [
	{
		slug: 'dos-decadas-de-wordpress',
		fn: 'dos_décadas_de_wordpress',
		title: '20 años de hacer lo mismo de otra forma en WordPress',
		subtitle: 'Un mismo pedido en cada época',
		description:
			'Cambiar un título y sumar tres tarjetas: cómo se resolvió ese pedido en cada época de WordPress y, ahora que lo hace un agente, para qué sigue haciendo falta un developer.',
		date: '2026-11-06',
		updated: '2026-11-06',
	},
]

const dateFormat = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
export const formatPostDate = (date: string) => dateFormat.format(new Date(`${date}T12:00:00Z`))
