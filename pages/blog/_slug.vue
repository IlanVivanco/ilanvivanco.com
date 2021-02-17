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
import Transitions from '~/mixins/Transitions'
import BackLink from '~/components/global/BackLink'
import BlogTitle from '~/components/blog/BlogTitle'
import BlogThumbnail from '~/components/blog/BlogThumbnail.vue'
import BlogFooter from '~/components/blog/BlogFooter.vue'

export default {
	name: 'BlogItems',
	head() {
		return {
			title: this.$t('meta.blog_title'),
			meta: [
				{ hid: 'twitter:title', name: 'twitter:title', content: this.post.title },
				{ hid: 'twitter:description', name: 'twitter:description', content: this.post.description },
				{ hid: 'twitter:image', name: 'twitter:image', content: this.post.thumbnail },
				{ hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.post.title },

				{ hid: 'og:type', property: 'og:type', content: 'article' },
				{ hid: 'og:site_name', property: 'og:site_name', content: this.$t('meta.name') },
				{ hid: 'og:title', property: 'og:title', content: this.post.title },
				{ hid: 'og:description', property: 'og:description', content: this.post.description },
				{ hid: 'og:image', property: 'og:image', content: this.post.thumbnail },
				{ hid: 'og:image:alt', property: 'og:image:alt', content: this.post.title },
			],
		}
	},
	computed: {
		languages() {
			return this.post.languages || []
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
		if (post && post.thumbnail) post.thumbnail = require(`~/assets/${post.thumbnail}`)

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

/deep/ img {
	max-width: 100%;
}
</style>
