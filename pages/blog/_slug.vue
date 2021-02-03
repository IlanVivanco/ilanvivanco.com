<template>
	<section class="container">
		<header class="main-header light">
			<back-link :to="{ path: localePath('/blog') }" />
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
import Transitions from '@/mixins/Transitions'
import BackLink from '@/components/global/BackLink'
import BlogTitle from '@/components/blog/BlogTitle'
import BlogThumbnail from '@/components/blog/BlogThumbnail.vue'
import BlogFooter from '@/components/blog/BlogFooter.vue'

export default {
	name: 'BlogItems',
	head() {
		return {}
	},
	async asyncData({ app, $content, params, error }) {
		const post = await $content(`${app.i18n.locale}/blog`, params.slug)
			.fetch()
			.catch((err) => {
				error({ statusCode: 404, message: 'Página no encontrada' })
			})

		return {
			post,
		}
	},
	components: { BlogTitle, BackLink, BlogThumbnail, BlogFooter },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
/deep/ img {
	max-width: 100%;
}
</style>
