// JSON-LD del sitio. Person es la entidad principal: el resto de los nodos apuntan a ella por @id.
// Sin email: la regla de privacidad de CLAUDE.md también vale para los datos estructurados.
import { cv } from '../data/cv'
import { publicPages } from '../data/pages'
import { projects, imageFor } from '../data/projects'
import { site } from '../data/site'

export type PageSchemaType = 'WebPage' | 'ProfilePage' | 'ContactPage' | 'CollectionPage'

const abs = (path: string) => new URL(path, site.url).href
const PERSON_ID = abs('/#person')
const WEBSITE_ID = abs('/#website')

const person = {
	'@type': 'Person',
	'@id': PERSON_ID,
	'name': site.name,
	'givenName': 'Ilán',
	'familyName': 'Vivanco',
	'url': abs('/'),
	'image': { '@type': 'ImageObject', 'url': abs('/img/ilan-800.webp'), 'width': 800, 'height': 1000 },
	'description': site.description,
	'jobTitle': 'CTO / Director of Engineering',
	'worksFor': { '@type': 'Organization', 'name': 'EpicDevs', 'url': 'https://epicdevs.com' },
	'address': {
		'@type': 'PostalAddress',
		'addressLocality': 'Santander',
		'addressRegion': 'Cantabria',
		'addressCountry': 'ES',
	},
	'contactPoint': { '@type': 'ContactPoint', 'contactType': 'professional', 'url': abs('/contacto') },
	'alumniOf': cv.es.education.map((e) => ({ '@type': 'EducationalOrganization', 'name': e.org })),
	'knowsLanguage': ['es', 'en'],
	'knowsAbout': [
		'WordPress',
		'JavaScript',
		'Astro',
		'Vue',
		'React',
		'Node.js',
		'Arquitectura web',
		'IA aplicada a la ingeniería',
	],
	'sameAs': site.socials.filter((s) => s.label !== 'EpicDevs').map((s) => s.href),
}

const website = {
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	'url': abs('/'),
	'name': site.name,
	'description': site.description,
	'inLanguage': 'es',
	'publisher': { '@id': PERSON_ID },
}

export const portfolioList = () => ({
	'@type': 'ItemList',
	'numberOfItems': projects.length,
	'itemListElement': projects.map((p, i) => ({
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

export const pageSchema = ({
	pathname,
	title,
	description,
	type = 'WebPage',
	mainEntity,
}: {
	pathname: string
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
				{ '@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': abs('/') },
				{ '@type': 'ListItem', 'position': 2, 'name': page.title, 'item': url },
			],
		}
	return {
		'@context': 'https://schema.org',
		'@graph': [
			person,
			website,
			{
				'@type': type,
				'@id': `${url}#webpage`,
				url,
				'name': title,
				description,
				'inLanguage': 'es',
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
