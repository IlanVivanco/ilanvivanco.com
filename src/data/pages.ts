// Páginas públicas del sitio: alimentan el sitemap, el JSON-LD y las imágenes OG.
// `updated` (YYYY-MM-DD) es el lastmod del sitemap: se cambia en cada bump de versión, solo en las páginas
// cuyo contenido cambió. Los rebuilds (por ejemplo, el semanal de Instagram) no cuentan.
// `noindex`: se publica y tiene imagen OG, pero no va al sitemap.
// `alternate`: la ruta de la misma página en el otro idioma. `getRelativeLocaleUrl` no traduce slugs: el mapa vive acá.
// Las URLs son contrato: cambiar una implica un redirect 301 en netlify.toml.

import type { Lang } from '../i18n/index.ts'
import { posts } from './posts.ts'
import { studiesFor } from './projects.ts'

export type PublicPage = {
	path: string
	lang: Lang
	alternate?: string
	slug: string
	fn: string
	title: string
	subtitle: string
	updated: string
	noindex?: boolean
}

export const publicPages: PublicPage[] = [
	// Inglés: con `noindex` y sin enlazar hasta el lanzamiento.
	{
		path: '/en',
		lang: 'en',
		alternate: '/',
		slug: 'en-home',
		fn: 'hello_world',
		title: 'Ilán Vivanco',
		subtitle: 'CTO at EpicDevs',
		updated: '2026-11-04',
		noindex: true,
	},
	{
		path: '/en/about',
		lang: 'en',
		alternate: '/sobre-mi',
		slug: 'en-about',
		fn: 'more_about_me',
		title: 'More about me',
		subtitle: 'From Buenos Aires to Santander',
		updated: '2026-11-04',
		noindex: true,
	},
	{
		path: '/en/resume',
		lang: 'en',
		alternate: '/curriculum',
		slug: 'en-resume',
		fn: 'my_history',
		title: 'My resume',
		subtitle: 'CTO / Director of Engineering',
		updated: '2026-11-04',
		noindex: true,
	},
	{
		path: '/en/portfolio',
		lang: 'en',
		alternate: '/portfolio',
		slug: 'en-portfolio',
		fn: 'portfolio',
		title: 'Work',
		subtitle: 'Web platforms and WordPress',
		updated: '2026-11-04',
		noindex: true,
	},
	{
		path: '/en/contact',
		lang: 'en',
		alternate: '/contacto',
		slug: 'en-contact',
		fn: 'contact_me',
		title: 'Shall we build something?',
		subtitle: 'Email, LinkedIn, or the form',
		updated: '2026-11-04',
		noindex: true,
	},
	{
		path: '/',
		lang: 'es',
		alternate: '/en',
		slug: 'home',
		fn: 'hola_mundo',
		title: 'Ilán Vivanco',
		subtitle: 'CTO en EpicDevs',
		updated: '2026-11-04',
	},
	{
		path: '/curriculum',
		lang: 'es',
		alternate: '/en/resume',
		slug: 'curriculum',
		fn: 'mi_historial',
		title: 'Mi CV',
		subtitle: 'CTO / Director of Engineering',
		updated: '2026-11-04',
	},
	{
		path: '/portfolio',
		lang: 'es',
		alternate: '/en/portfolio',
		slug: 'portfolio',
		fn: 'portfolio',
		title: 'Trabajos',
		subtitle: 'Plataformas y sitios en producción',
		updated: '2026-11-04',
	},
	{
		path: '/blog',
		lang: 'es',
		slug: 'blog',
		fn: 'blog',
		title: 'Blog',
		subtitle: 'Lo que aprendí construyendo para la web',
		updated: '2026-11-04',
	},
	{
		path: '/sobre-mi',
		lang: 'es',
		alternate: '/en/about',
		slug: 'sobre-mi',
		fn: 'más_info_sobre_mí',
		title: 'Más sobre mí',
		subtitle: 'De Buenos Aires a Santander',
		updated: '2026-11-03',
	},
	{
		path: '/contacto',
		lang: 'es',
		alternate: '/en/contact',
		slug: 'contacto',
		fn: 'contactame',
		title: '¿Hacemos algo juntos?',
		subtitle: 'Contame en qué estás trabajando',
		updated: '2026-11-03',
	},
	{
		path: '/privacidad',
		lang: 'es',
		slug: 'privacidad',
		fn: 'privacidad',
		title: 'Privacidad y aviso legal',
		subtitle: 'Qué datos se usan y para qué',
		updated: '2026-11-03',
		noindex: true,
	},
]

// La home usa la imagen original; el resto se genera en el build. Sin página propia (404), la original.
// Cada case study es una página pública más.
publicPages.push(
	...studiesFor('es').map((p) => ({
		path: `/portfolio/${p.slug}`,
		lang: 'es' as const,
		slug: `portfolio-${p.slug}`,
		fn: p.slug.replace(/-/g, '_'),
		title: p.name,
		subtitle: p.study!.tagline,
		updated: '2026-11-04',
	}))
)

// Cada post también.
publicPages.push(
	...posts.map((p) => ({
		path: `/blog/${p.slug}`,
		lang: 'es' as const,
		slug: `blog-${p.slug}`,
		fn: p.fn,
		title: p.title,
		subtitle: p.subtitle,
		updated: p.updated,
	}))
)

// La ruta de una página en español, en el idioma pedido.
export const pathFor = (path: string, locale?: string) =>
	(locale === 'en' && publicPages.find((p) => p.path === path)?.alternate) || path

export const ogPath = (path: string) => {
	const page = publicPages.find((p) => p.path === path)
	return !page || page.path === '/' ? '/og.png' : `/og/${page.slug}.png`
}
