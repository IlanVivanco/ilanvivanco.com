import esAR from './es_AR';
import enUS from './en_US';

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
		messages: {
			en: enUS,
			es: esAR
		}
	},
}
