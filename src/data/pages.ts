// Páginas públicas del sitio: alimentan el sitemap, el JSON-LD y las imágenes OG.
// `updated` (YYYY-MM-DD) es el lastmod del sitemap: se cambia en cada bump de versión, solo en las páginas
// cuyo contenido cambió. Los rebuilds (por ejemplo, el semanal de Instagram) no cuentan.
// `noindex`: se publica y tiene imagen OG, pero no va al sitemap.
// Las URLs son contrato: cambiar una implica un redirect 301 en netlify.toml.

export type PublicPage = {
	path: string
	slug: string
	fn: string
	title: string
	subtitle: string
	updated: string
	noindex?: boolean
}

export const publicPages: PublicPage[] = [
	{
		path: '/',
		slug: 'home',
		fn: 'hola_mundo',
		title: 'Ilán Vivanco',
		subtitle: 'CTO en EpicDevs',
		updated: '2026-11-04',
	},
	{
		path: '/curriculum',
		slug: 'curriculum',
		fn: 'mi_historial',
		title: 'Mi CV',
		subtitle: 'CTO / Director of Engineering',
		updated: '2026-11-04',
	},
	{
		path: '/portfolio',
		slug: 'portfolio',
		fn: 'portfolio',
		title: 'Trabajos',
		subtitle: 'Plataformas y sitios en producción',
		updated: '2026-11-04',
	},
	{
		path: '/sobre-mi',
		slug: 'sobre-mi',
		fn: 'más_info_sobre_mí',
		title: 'Más sobre mí',
		subtitle: 'De Buenos Aires a Santander',
		updated: '2026-11-03',
	},
	{
		path: '/contacto',
		slug: 'contacto',
		fn: 'contactame',
		title: '¿Hacemos algo juntos?',
		subtitle: 'Contame en qué estás trabajando',
		updated: '2026-11-03',
	},
	{
		path: '/privacidad',
		slug: 'privacidad',
		fn: 'privacidad',
		title: 'Privacidad y aviso legal',
		subtitle: 'Qué datos se usan y para qué',
		updated: '2026-11-03',
		noindex: true,
	},
]

// La home usa la imagen original; el resto se genera en el build. Sin página propia (404), la original.
export const ogPath = (path: string) => {
	const page = publicPages.find((p) => p.path === path)
	return !page || page.path === '/' ? '/og.png' : `/og/${page.slug}.png`
}
