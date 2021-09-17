<template>
	<section class="container">
		<header class="main-header light">
			<nav class="main-header__nav">
				<back-link :to="{ path: localePath('/blog') }" />
				<blog-lang-switcher :locales="languages" />
			</nav>
			<blog-title :title="post.title" :description="post.description" />
		</header>

		<section class="main-content">
			<blog-thumbnail :post="post" />
			<nuxt-content :document="post" />
			<blog-footer :post="post"></blog-footer>
		</section>
	</section>
</template>

<script>
import DynamicImages from '~/mixins/DynamicImages'
import Transitions from '~/mixins/Transitions'
import BackLink from '~/components/global/BackLink'
import BlogTitle from '~/components/blog/BlogTitle'
import BlogThumbnail from '~/components/blog/BlogThumbnail.vue'
import BlogFooter from '~/components/blog/BlogFooter.vue'

export default {
	name: 'BlogItems',
	head() {
		return {
			title: this.post.title,
			titleTemplate: `%s - ${this.$t('meta.name')}`,
			meta: [
				{ hid: 'description', name: 'description', content: this.post.description },

				{ hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
				{ hid: 'twitter:title', name: 'twitter:title', content: this.post.title },
				{ hid: 'twitter:description', name: 'twitter:description', content: this.post.description },
				{ hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.post.title },
				{ hid: 'twitter:creator', name: 'twitter:creator', content: this.$t('meta.twitter') },
				{
					hid: 'twitter:image',
					name: 'twitter:image',
					content: `${this.$t('meta.url')}/${this.post.thumbnail.meta_src}`,
				},

				{ hid: 'og:type', property: 'og:type', content: 'article' },
				{ hid: 'og:site_name', property: 'og:site_name', content: this.$t('meta.name') },
				{ hid: 'og:title', property: 'og:title', content: this.post.title },
				{ hid: 'og:description', property: 'og:description', content: this.post.description },
				{ hid: 'og:image:alt', property: 'og:image:alt', content: this.post.title },
				{
					hid: 'og:image',
					property: 'og:image',
					content: `${this.$t('meta.url')}/${this.post.thumbnail.meta_src}`,
				},
			],
			script: [
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
								'@id': `${this.$t('meta.url')}/#webpage`,
								url: `${this.$t('meta.url')}/blog/${this.post.slug}`,
								name: this.post.title,
								description: this.post.description,
								isPartOf: { '@id': `${this.$t('meta.url')}/#website` },
								primaryImageOfPage: { '@id': `${this.$t('meta.url')}/blog/${this.post.slug}/#primary-image` },
								datePublished: this.post.createdAt,
								dateModified: this.post.updatedAt,
								breadcrumb: { '@id': `${this.$t('meta.url')}/#breadcrumb` },
								inLanguage: this.currentISOLocale,
								potentialAction: [
									{ '@type': 'ReadAction', target: [`${this.$t('meta.url')}/blog/${this.post.slug}`] },
								],
							},
							{
								'@type': 'BreadcrumbList',
								'@id': `${this.$t('meta.url')}/#breadcrumb`,
								itemListElement: [
									{
										'@type': 'ListItem',
										position: 1,
										item: {
											'@type': 'WebPage',
											'@id': `${this.$t('meta.url')}/#homepage`,
											url: this.$t('meta.url'),
											name: this.$t('meta.home_title'),
										},
									},
									{
										'@type': 'ListItem',
										position: 2,
										item: {
											'@type': 'WebPage',
											'@id': `${this.$t('meta.url')}/blog/#blogpage`,
											url: `${this.$t('meta.url')}/blog`,
											name: this.currentTitle,
										},
									},
									{
										'@type': 'ListItem',
										position: 3,
										item: {
											'@type': 'WebPage',
											'@id': `${this.$t('meta.url')}/blog/${this.post.slug}/#article`,
											url: `${this.$t('meta.url')}/blog/${this.post.slug}`,
											name: this.post.title,
										},
									},
								],
							},
							{
								'@type': 'ImageObject',
								'@id': `${this.$t('meta.url')}/blog/${this.post.slug}/#primary-image`,
								url: this.$t('meta.url') + this.post.thumbnail.images.slice(-1)[0].path,
								width: this.post.thumbnail.images.slice(-1)[0].width,
								height: this.post.thumbnail.images.slice(-1)[0].height,
								caption: this.post.title,
								inLanguage: this.currentISOLocale,
							},
							{
								'@type': 'Article',
								'@id': `${this.$t('meta.url')}/blog/${this.post.slug}/#article`,
								isPartOf: { '@id': `${this.$t('meta.url')}/#webpage` },
								author: { '@id': `${this.$t('meta.url')}/#person` },
								headline: this.post.title,
								datePublished: this.post.createdAt,
								dateModified: this.post.updatedAt,
								mainEntityOfPage: { '@id': `${this.$t('meta.url')}/#webpage` },
								commentCount: 0,
								publisher: { '@id': `${this.$t('meta.url')}/#person` },
								image: { '@id': `${this.$t('meta.url')}/blog/${this.post.slug}/#primary-image` },
								keywords: this.post.tags.join(', '),
								inLanguage: this.currentISOLocale,
							},
						],
					},
				},
			],
		}
	},
	computed: {
		languages() {
			return this.post.languages || []
		},
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
			return this.$t(`meta.${this.currentPathSlug}_title`)
		},
		currentISOLocale() {
			return this.$i18n.locales.filter((locale) => locale.code === this.$i18n.locale).pop().iso
		},
	},
	async asyncData({ app, redirect, $content, params, error }) {
		const post = await $content(`${app.i18n.locale}/blog`, params.slug)
			.fetch()
			.catch((err) => {
				error({ statusCode: 404 })
			})

		// Redirect if single is not visible
		if (post && !post.show && process.env.NODE_ENV != 'development') redirect({ path: app.localePath('/blog') })

		// Require post image
		if (post && post.thumbnail) post.thumbnail = DynamicImages.methods.fetchImageAttr(post.thumbnail)

		return { post }
	},
	components: { BlogTitle, BackLink, BlogThumbnail, BlogFooter },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
.main-header__nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

::v-deep img {
	max-width: 100%;
}
</style>
