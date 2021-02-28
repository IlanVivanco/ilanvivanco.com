import esAR from './es_AR';
import enUS from './en_US';

export default {
	locales: [
		{
			code: 'es',
			iso: 'es-ES',
			name: 'Español',
			icon: 'svg/flag-es.svg'
		},
		{
			code: 'en',
			iso: 'en-US',
			name: 'English',
			icon: 'svg/flag-en.svg'
		},
	],
	defaultLocale: 'es',
	detectBrowserLanguage: false,
	vueI18n: {
		fallbackLocale: 'es',
		messages: {
			en: enUS,
			es: esAR
		}
	},
}
