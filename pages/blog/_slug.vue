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
		return {}
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
				error({ statusCode: 404, message: 'Página no encontrada' })
			})

		// Redirect if single is not visible
		if (!post.show && process.env.NODE_ENV != 'development')
			redirect({ path: app.localePath('/blog') })

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
