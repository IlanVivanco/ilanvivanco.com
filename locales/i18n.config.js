import es from './es_ES';
import en from './en_US';

export default {
	locales: [
		{
			code: 'es',
			iso: 'es-ES',
			name: 'Español',
			icon: 'images/flag-es.svg'
		},
		{
			code: 'en',
			iso: 'en-US',
			name: 'English',
			icon: 'images/flag-en.svg'
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
		messages: { en, es }
	}
}
