import es_AR from './es_AR';
import en_US from './en_US';

export default {
	locales: [
		{
			code: 'es',
			iso: 'es-ES',
			name: 'Español',
			icon: '/images/svg/flag-es.svg'
		},
		{
			code: 'en',
			iso: 'en-US',
			name: 'English',
			icon: '/images/svg/flag-en.svg'
		},
	],
	defaultLocale: 'es',
	seo: false,
	detectBrowserLanguage: {
		useCookie: true,
		alwaysRedirect: true,
	},
	vueI18n: {
		fallbackLocale: 'es',
		messages: { en: en_US, es: es_AR }
	},
}
