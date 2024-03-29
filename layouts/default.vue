<template>
	<div class="main-layout" :class="currentPathSlug">
		<animated-background />
		<!-- <lang-switcher /> -->

		<div class="page">
			<div class="container main-container">
				<el-row align="middle" type="flex" class="main-row">
					<el-col :span="2" class="navbar">
						<div class="navbar__inner">
							<main-nav />
						</div>
					</el-col>
					<el-col :span="7" class="sidebar">
						<div class="sidebar__inner">
							<main-sidebar :alt-banner-img="altBannerImage" :alt-banner-leave="altBannerLeave" />
						</div>
					</el-col>
					<el-col tag="main" :span="16" class="main">
						<Nuxt class="main__inner" />
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
import AnimatedBackground from '~/components/AnimatedBackground'
import LangSwitcher from '~/components/LangSwitcher'
import MainSidebar from '~/components/MainSidebar'
import MainNav from '~/components/Nav'

export default {
	name: 'DefaultLayout',
	components: {
		AnimatedBackground,
		LangSwitcher,
		MainNav,
		MainSidebar,
	},
	transition: { mode: '' },
	head() {
		const thumb = '/images/ilan-vivanco-social-card.png'

		return {
			titleTemplate: `${this.currentTitle} — ${this.$t('meta.name')}`,
			meta: [
				{ hid: 'description', name: 'description', content: this.$t('meta.description') },

				{ hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
				{ hid: 'twitter:title', name: 'twitter:title', content: this.$t('meta.name') },
				{ hid: 'twitter:description', name: 'twitter:description', content: this.$t('meta.description') },
				{ hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$t('meta.name') },
				{ hid: 'twitter:creator', name: 'twitter:creator', content: this.$t('meta.twitter') },
				{ hid: 'twitter:image', name: 'twitter:image', content: `https://ilanvivanco.com${thumb}` },

				{ hid: 'og:type', property: 'og:type', content: 'website' },
				{ hid: 'og:site_name', property: 'og:site_name', content: this.$t('meta.name') },
				{ hid: 'og:title', property: 'og:title', content: this.$t('meta.name') },
				{ hid: 'og:description', property: 'og:description', content: this.$t('meta.description') },
				{ hid: 'og:image:alt', property: 'og:image:alt', content: this.$t('meta.name') },
				{ hid: 'og:image', property: 'og:image', content: `https://ilanvivanco.com${thumb}` },
			],
			htmlAttrs: {
				lang: this.$i18n.locale,
			},
			script: [
				{
					src: 'https://www.googletagmanager.com/gtag/js?id=G-7CJGME4GRL',
					async: true,
				},
				{ src: '/js/gtag.js' },
				{
					type: 'application/ld+json',
					hid: 'schema',
					json: {
						'@context': 'https://schema.org',
						'@graph': [
							{
								'@type': 'Organization',
								'@id': `${this.$t('meta.url')}/#organization`,
								founder: { '@id': `${this.$t('meta.url')}/#person` },
								url: this.$t('meta.url'),
								logo: {
									'@type': 'ImageObject',
									'@id': `${this.$t('meta.url')}/#personlogo`,
									url: 'https://ilanvivanco.com/images/ilan-vivanco-logo.png',
									width: 600,
									height: 100,
									caption: this.$t('meta.name'),
								},
							},
							{
								'@type': 'Person',
								'@id': `${this.$t('meta.url')}/#person`,
								name: this.$t('meta.name'),
								url: this.$t('meta.url'),
								image: {
									'@type': 'ImageObject',
									'@id': `${this.$t('meta.url')}/#personimage`,
									url: 'https://ilanvivanco.com/images/ilan-vivanco.jpg',
									width: 1440,
									height: 1080,
									caption: this.$t('meta.name'),
								},
								sameAs: [
									'https://www.linkedin.com/in/ilanvivanco',
									'https://twitter.com/IlanVivanco',
									'https://github.com/IlanVivanco',
									'https://www.instagram.com/ilanvivanco',
									this.$t('meta.url'),
								],
								description: this.$t('meta.name'),
							},
							{
								'@type': 'WebSite',
								'@id': `${this.$t('meta.url')}/#website`,
								url: this.$t('meta.url'),
								name: `${this.currentTitle} - ${this.$t('meta.name')}`,
								description: this.$t('meta.name'),
								publisher: { '@id': `${this.$t('meta.url')}/#person` },
								inLanguage: this.currentISOLocale,
							},
							{
								'@type': 'WebPage',
								'@id': `${this.$t('meta.url') + this.$route.path}#webpage`,
								url: this.$t('meta.url') + this.$route.path,
								name: this.currentTitle,
								description: this.$t('meta.description'),
								isPartOf: { '@id': `${this.$t('meta.url')}/#website` },
								breadcrumb: { '@id': `${this.$t('meta.url')}/#breadcrumb` },
								inLanguage: this.currentISOLocale,
							},
							{
								'@type': 'BreadcrumbList',
								'@id': `${this.$t('meta.url')}/#breadcrumb`,
								itemListElement: this.breadcrumbElements,
							},
						],
					},
				},
			],
		}
	},
	data() {
		return {
			altBannerImage: null,
			bannerChanged: false,
			altBannerLeave: false,
		}
	},
	created() {
		this.$eventHub.$on('updateBannerImage', this.changeAltBannerImage)
	},
	watch: {
		$route(to, from) {
			const stripLocale = (name) => {
				const routeSeperator = '__'
				return name.substring(0, name.indexOf(routeSeperator))
			}

			if (from && to && from.name && to.name && stripLocale(from.name) !== stripLocale(to.name)) {
				this.altBannerLeave = true
			}
		},
	},
	methods: {
		changeAltBannerImage(image) {
			this.altBannerLeave = false
			this.altBannerImage = image
		},
	},
	computed: {
		currentPathSlug() {
			if (!this.$route.name) return ''
			let slug = this.$route.name.match(/^(.*?)__.{2}/)

			switch (slug[1]) {
				case 'index':
					return 'home'
				case 'blog-slug':
					return 'blog_single'
				default:
					return slug[1]
			}
		},
		currentTitle() {
			if (this.currentPathSlug) return this.$t(`meta.${this.currentPathSlug}_title`)
		},
		currentISOLocale() {
			return this.$i18n.locales.filter((locale) => locale.code === this.$i18n.locale).pop().iso
		},
		breadcrumbElements() {
			const breadcrumbs = []
			breadcrumbs.push({
				'@type': 'ListItem',
				position: 1,
				item: {
					'@type': 'WebPage',
					'@id': `${this.$t('meta.url')}/#homepage`,
					url: this.$t('meta.url'),
					name: this.$t('meta.home_title'),
				},
			})

			if (this.$route.path != '/') {
				breadcrumbs.push({
					'@type': 'ListItem',
					position: 2,
					item: {
						'@type': 'WebPage',
						'@id': `${this.$t('meta.url') + this.$route.path}/#${this.$route.path.slice(1)}`,
						url: this.$t('meta.url') + this.$route.path,
						name: this.currentTitle,
					},
				})
			}

			return breadcrumbs
		},
	},
}
</script>

<style lang="scss" scoped>
.main-layout {
	position: relative;
}

.page {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	@include breakpoint('medium') {
		height: 100vh;
		overflow-y: scroll;
		align-items: flex-start;

		&::-webkit-scrollbar {
			width: 0.5rem;
		}

		&::-webkit-scrollbar-track {
			background: $color-grayscale-4;
		}

		&::-webkit-scrollbar-thumb {
			background: $color-grayscale-6;
		}

		.main-row {
			flex-wrap: wrap;
		}
	}

	@include breakpoint('small') {
		margin-top: 65px;
		max-height: calc(100vh - 65px);
	}

	.main-container {
		width: 100%;
		max-width: calc(#{map-get($breakpoints, 'big')} - 40px);

		@include breakpoint('big') {
			max-width: calc(#{map-get($breakpoints, 'medium')} - 40px);
		}

		@include breakpoint('medium') {
			max-width: 600px;
			position: relative;
			left: calc(75px / 2);
		}

		@include breakpoint('small') {
			max-width: 85vw;
			left: 0;
		}

		@include breakpoint('tiny') {
			max-width: 80vw;
		}
	}
}

.navbar {
	@include border-radius();

	width: 75px;
	align-self: flex-start;
	margin-top: 2.5vh;
	overflow: hidden;
	box-shadow: 0 0 10px 2px rgba(black, 0.1);

	@include breakpoint('medium') {
		margin-top: 2.5vh;
		position: fixed;
		left: calc(((100vw - 600px) / 2) - (75px / 2) - 20px); //75px .navbar width
	}

	@include breakpoint('small') {
		border-radius: 0;
		margin-top: 0;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 10;
		box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, 0.1);
	}
}

.sidebar {
	padding-left: 1rem;
	position: relative;
	z-index: 1;
	height: 70vh;

	@include breakpoint('big') {
		height: 80vh;
	}

	@include breakpoint('medium') {
		width: 100%;
		height: auto;
		padding-left: 0;
		margin: 2.5vh 0;
	}

	&__inner {
		@include border-radius(left);

		@include breakpoint('big') {
			@include border-radius();
		}

		position: relative;
		overflow: hidden;
		height: 100%;
		background: $color-grayscale-1;
		text-align: center;
		box-shadow: 0 0 10px 2px rgba(black, 0.1), 5px 0px 5px rgba(black, 0.05);

		@include breakpoint('medium') {
			height: 40vh;
		}

		@include breakpoint('tiny') {
			height: auto;
		}
	}
}

.main {
	@include border-radius();

	height: 75vh;
	overflow: hidden;
	@include border-radius();

	@include breakpoint('big') {
		@include border-radius(right);
	}

	@include breakpoint('medium') {
		@include border-radius();

		width: 100%;
		height: auto;
		margin-bottom: 2.5vh;
	}

	@include breakpoint('small') {
		margin-bottom: 5vh;
	}

	&__inner {
		height: 75vh;
		overflow-y: auto;
		overflow-x: hidden;
		background: $color-grayscale-1;

		@include breakpoint('medium') {
			height: auto;
			overflow-y: visible;
		}

		&::-webkit-scrollbar {
			width: 2px;
		}

		&::-webkit-scrollbar-track {
			background: $color-blue;
		}

		&::-webkit-scrollbar-thumb {
			background: $color-grayscale-5;
		}
	}
}
</style>
