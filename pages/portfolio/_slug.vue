<template>
	<section class="container">
		<header class="main-header light">
			<nav class="main-header__nav">
				<back-link :to="{ path: localePath('/portfolio') }" />
				<blog-lang-switcher :locales="languages" />
			</nav>
			<blog-title :title="post.title" :description="post.description" />
		</header>

		<section class="main-content">
			<nuxt-content :document="post" />
		</section>
	</section>
</template>

<script>
import DynamicImages from '~/mixins/DynamicImages'
import Transitions from '~/mixins/Transitions'
import BlogTitle from '~/components/blog/BlogTitle'
import BackLink from '~/components/global/BackLink'

export default {
	name: 'PortfolioItems',
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
					content: `https://ilanvivanco.com${this.post.thumbnail.meta_src}`,
				},

				{ hid: 'og:type', property: 'og:type', content: 'article' },
				{ hid: 'og:site_name', property: 'og:site_name', content: this.$t('meta.name') },
				{ hid: 'og:title', property: 'og:title', content: this.post.title },
				{ hid: 'og:description', property: 'og:description', content: this.post.description },
				{ hid: 'og:image:alt', property: 'og:image:alt', content: this.post.title },
				{
					hid: 'og:image',
					property: 'og:image',
					content: `https://ilanvivanco.com${this.post.thumbnail.meta_src}`,
				},
			],
		}
	},
	computed: {
		languages() {
			return this.post.languages || []
		},
	},
	async asyncData({ app, $content, params, error, redirect }) {
		const post = await $content(`${app.i18n.locale}/portfolio`, params.slug)
			.fetch()
			.catch((err) => {
				error({ statusCode: 404 })
			})

		// Redirect if not single available
		if (post && !post.has_single) redirect({ path: app.localePath('/portfolio') })

		// Require post image
		if (post && post.thumbnail) post.thumbnail = DynamicImages.methods.fetchImageAttr(post.thumbnail)

		return { post }
	},
	components: { BlogTitle, BackLink },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
.main-header__nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

/deep/ img {
	max-width: 100%;
}
</style>
