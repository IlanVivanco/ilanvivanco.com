import I18N from './locales/i18n.config';
import ENV from './env';

export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: '',
		htmlAttrs: { lang: 'es' },
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=0.5, maximum-scale=3.0' },
		],
		link: [
			{ rel: 'icon', type: 'image/png', href: '/images/favicon.png' },
		]
	},


	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'element-ui/lib/theme-chalk/index.css',
		'animate.css/animate.min.css',
		'@/assets/css/theme.css',
		'@/assets/scss/main.scss',
	],

	// Load SCSS globally for components
	styleResources: {
		scss: [
			'./assets/scss/_variables.scss',
			'./assets/scss/_spacing.scss',
			'./assets/scss/_mixins.scss',
		]
	},

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'@/plugins/eventHub',
		'@/plugins/element-ui',
		'@/plugins/gtag',
		'@/plugins/dynamicImageLoader',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// Doc https://github.com/nuxt-community/dotenv-module
		'@nuxtjs/dotenv',
		'@nuxtjs/style-resources'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// Doc https://i18n.nuxtjs.org/
		'nuxt-i18n',
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		// Doc: https://github.com/nuxt/content
		'@nuxt/content',
		// https://github.com/geeogi/nuxt-responsive-loader
		'nuxt-responsive-loader',
		// https://sitemap.nuxtjs.org/
		'@nuxtjs/sitemap',
	],

	// Axios module configuration: https://axios.nuxtjs.org/options
	axios: {},

	// Content module configuration: https://content.nuxtjs.org/configuration
	content: {
		markdown: {
			prism: {
				theme: '@/assets/scss/prism/monokai-cotalpa.scss'
			}
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: [/^element-ui/, 'gsap'],
	},

	// Netlify client side rendering issue: https://nuxtjs.org/docs/2.x/deployment/netlify-deployment#for-client-side-rendering-only
	generate: {
		fallback: true
	},

	// Responsive Loader config
	responsiveLoader: {
		// disable: (process.env.NODE_ENV == 'development'),
		adapter: require('responsive-loader/sharp'),
		name: 'img/[name]-[hash:5]-[width].[ext]',
		min: 320,
		max: 1920,
		steps: 5,
		placeholder: true,
		placeholderSize: 60,
	},

	// i18n config
	i18n: I18N,

	// Sitemap
	sitemap: {
		hostname: ENV.base_url,
		gzip: true,
		// i18n: true,
		exclude: [
			'/blog',
			'/about',
			'/resume',
			'/contact',
		],

		i18n: true,
		routes: async () => {
			const { $content } = require('@nuxt/content')
			const postsES = await $content(`es/blog`).only(['path', 'slug', 'show']).fetch()
			const postsEN = await $content(`en/blog`).only(['path', 'slug', 'show']).fetch()
			const posts = [...postsES, ...postsEN]

			return [
				'curriculum',
				'contacto',
				// ...posts.map((article) => {
				// 	if (article.show) {
				// 		return {
				// 			url: article.path.split('/')[1] === 'es' ? `blog/${article.slug}` : article.path,
				// 			// links: [
				// 			// 	{ lang: 'es', url: `blog/article.slug` },
				// 			// 	{ lang: 'en', url: `blog/en/${article.slug}` }
				// 			// ]
				// 		}
				// 	}
				// })
			]
		},
		// filter({ routes }) {
		// 	return routes.map((route) => {
		// 		if (!route.name) return route
		// 		const page = route.name.split('__')[0]
		// 		return {
		// 			url: route.url,
		// 			links: route.links.concat([
		// 				{
		// 					lang: 'x-default',
		// 					url: page === 'index' ? '/' : page
		// 				}
		// 			])
		// 		}
		// 	})
		// }
	}
}
