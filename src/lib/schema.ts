// JSON-LD del sitio. Person es la entidad principal: el resto de los nodos apuntan a ella por @id.
// Sin email: la regla de privacidad de CLAUDE.md también vale para los datos estructurados.
import { cv } from '../data/cv'
import { ogPath, pathFor, publicPages } from '../data/pages'
import type { Post } from '../data/posts'
import { projectsFor, imageFor } from '../data/projects'
import { site, siteText } from '../data/site'
import { byLang, ui } from '../i18n'

export type PageSchemaType = 'WebPage' | 'ProfilePage' | 'ContactPage' | 'CollectionPage'

const abs = (path: string) => new URL(path, site.url).href
const PERSON_ID = abs('/#person')
const WEBSITE_ID = abs('/#website')

const knowsAbout = {
	es: ['Arquitectura web', 'IA aplicada a la ingeniería'],
	en: ['Web architecture', 'AI applied to engineering'],
}

const person = (lang?: string) => ({
	'@type': 'Person',
	'@id': PERSON_ID,
	'name': site.name,
	'givenName': 'Ilán',
	'familyName': 'Vivanco',
	'url': abs(pathFor('/', lang)),
	'image': { '@type': 'ImageObject', 'url': abs('/img/ilan-800.webp'), 'width': 800, 'height': 1000 },
	'description': siteText(lang).description,
	'jobTitle': 'CTO / Director of Engineering',
	'worksFor': { '@type': 'Organization', 'name': 'EpicDevs', 'url': 'https://epicdevs.com' },
	'address': {
		'@type': 'PostalAddress',
		'addressLocality': 'Santander',
		'addressRegion': 'Cantabria',
		'addressCountry': 'ES',
	},
	'contactPoint': { '@type': 'ContactPoint', 'contactType': 'professional', 'url': abs(pathFor('/contacto', lang)) },
	'alumniOf': cv.es.education.map((e) => ({ '@type': 'EducationalOrganization', 'name': e.org })),
	'knowsLanguage': ['es', 'en'],
	'knowsAbout': ['WordPress', 'JavaScript', 'Astro', 'Vue', 'React', 'Node.js', ...byLang(knowsAbout, lang)],
	'sameAs': site.socials.filter((s) => s.label !== 'EpicDevs').map((s) => s.href),
})

const website = (lang?: string) => ({
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	'url': abs(pathFor('/', lang)),
	'name': site.name,
	'description': siteText(lang).description,
	'inLanguage': lang ?? 'es',
	'publisher': { '@id': PERSON_ID },
})

export const portfolioList = (lang?: string) => ({
	'@type': 'ItemList',
	'numberOfItems': projectsFor(lang).length,
	'itemListElement': projectsFor(lang).map((p, i) => ({
		'@type': 'ListItem',
		'position': i + 1,
		'item': {
			'@type': 'CreativeWork',
			'name': p.name,
			...(p.url && { url: p.url }),
			'description': p.description,
			'dateCreated': p.date,
			'image': abs(imageFor(p)),
			'keywords': p.tags.join(', '),
			'creator': { '@id': PERSON_ID },
		},
	})),
})

export const blogPosting = (p: Post, lang?: string) => ({
	'@type': 'BlogPosting',
	'headline': p.title,
	'description': p.description,
	'url': abs(`/blog/${p.slug}`),
	'image': abs(ogPath(`/blog/${p.slug}`)),
	'datePublished': p.date,
	'dateModified': p.updated,
	'inLanguage': lang ?? 'es',
	'author': { '@id': PERSON_ID },
	'publisher': { '@id': PERSON_ID },
})

export const pageSchema = ({
	pathname,
	lang,
	title,
	description,
	type = 'WebPage',
	mainEntity,
}: {
	pathname: string
	lang?: string
	title: string
	description: string
	type?: PageSchemaType
	mainEntity?: Record<string, unknown>
}) => {
	const page = publicPages.find((p) => p.path === pathname)
	const url = abs(pathname)
	const breadcrumb = pathname !== '/' &&
		page && {
			'@type': 'BreadcrumbList',
			'@id': `${url}#breadcrumb`,
			'itemListElement': [
				{ '@type': 'ListItem', 'position': 1, 'name': ui(lang).home, 'item': abs(pathFor('/', lang)) },
				{ '@type': 'ListItem', 'position': 2, 'name': page.title, 'item': url },
			],
		}
	return {
		'@context': 'https://schema.org',
		'@graph': [
			person(lang),
			website(lang),
			{
				'@type': type,
				'@id': `${url}#webpage`,
				url,
				'name': title,
				description,
				'inLanguage': lang ?? 'es',
				'isPartOf': { '@id': WEBSITE_ID },
				...(page && { dateModified: page.updated }),
				...(type === 'ProfilePage' || pathname === '/'
					? { mainEntity: { '@id': PERSON_ID } }
					: { about: { '@id': PERSON_ID } }),
				...(mainEntity && { mainEntity }),
				...(breadcrumb && { breadcrumb: { '@id': breadcrumb['@id'] } }),
			},
			...(breadcrumb ? [breadcrumb] : []),
		],
	}
}
