import esAR from './es_AR'
import enUS from './en_US'

export const I18N = {
	locales: [
		{
			code: 'es',
			iso: 'es-ES',
			name: 'Español',
			icon: 'svg/flag-es.svg',
		},
		{
			code: 'en',
			iso: 'en-US',
			name: 'English',
			icon: 'svg/flag-en.svg',
		},
	],
	defaultLocale: 'es',
	detectBrowserLanguage: false,
	vueI18n: {
		fallbackLocale: 'es',
		messages: {
			en: enUS,
			es: esAR,
		},
	},
}

export function mapBlogPosts(posts, lang = 'es') {
	let translation = lang === 'es' ? 'en' : 'es'
	let baseURL = lang === 'es' ? '' : '/en'

	return posts.map((article) => {
		let url = {
			url: article.path.replace('/es/', '/'),
			links: [{ lang: lang, url: `${baseURL}/blog/${article.slug}` }],
		}

		if (article.languages.length) {
			url.links.push({ lang: translation, url: article.languages[0].path })
		}

		return url
	})
}
