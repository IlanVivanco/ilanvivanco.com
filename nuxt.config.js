import I18N from './locales/i18n.config';

export default {
	/*
	** Nuxt rendering mode
	** See https://nuxtjs.org/api/configuration-mode
	*/
	mode: 'universal',
	/*
	** Nuxt target
	** See https://nuxtjs.org/api/configuration-target
	*/
	target: 'static',
	/*
	** Headers of the page
	** See https://nuxtjs.org/api/configuration-head
	*/
	head: {
		titleTemplate: '%s - Ilán Vivanco',
		title: 'Full Stack Developer',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' }
		],
		link: [
			{ rel: 'icon', type: 'image/png', href: '/favicon.png' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,900;1,400;1,900&display=swap' }, // Titles
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Economica:ital,wght@0,400;0,600;1,400;1,600&display=swap' }, // Alt titles
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap' }, // Body
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap' }, // Monospace
		]
	},
	/*
	** Global CSS
	*/
	css: [
		'element-ui/lib/theme-chalk/index.css',
		'animate.css/animate.min.css',
		'@/assets/css/theme.css',
		'@/assets/scss/main.scss',
	],
	/*
	** Load SCSS globally for components
	*/
	styleResources: {
		scss: [
			'./assets/scss/_variables.scss',
			'./assets/scss/_spacing.scss',
			'./assets/scss/_mixins.scss',
		]
	},
	/*
	** Plugins to load before mounting the App
	** https://nuxtjs.org/guide/plugins
	*/
	plugins: [
		'@/plugins/eventHub',
		'@/plugins/element-ui',
	],
	/*
	** Auto import components
	** See https://nuxtjs.org/api/configuration-components
	*/
	components: true,
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		// Doc https://github.com/nuxt-community/dotenv-module
		'@nuxtjs/dotenv',
		'@nuxtjs/style-resources'
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		// Doc: https://github.com/nuxt/content
		'@nuxt/content',
		// Doc https://i18n.nuxtjs.org/
		['nuxt-i18n', I18N],
	],
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {},
	/*
	** Content module configuration
	** See https://content.nuxtjs.org/configuration
	*/
	content: {
		markdown: {
			prism: {
				theme: '@/assets/scss/prism/monokai-cotalpa.scss'
			}
		},
	},
	/*
	** Build configuration
	** See https://nuxtjs.org/api/configuration-build/
	*/
	build: {
		transpile: [/^element-ui/, 'gsap'],
	},
}
