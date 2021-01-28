<template>
	<section class="container">
		<header class="main-header light">
			<back-link :to="{ path: '/blog' }" />
			<section-title :title="post.title" :description="post.description" />
		</header>

		<section class="main-content">
			<post-header />
			<nuxt-content :document="post" />
		</section>
	</section>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import SectionTitle from '@/components/global/SectionTitle'
import BackLink from '@/components/global/BackLink'
import PostHeader from '~/components/posts/PostHeader.vue'

export default {
	name: 'BlogItems',
	head() {
		return {}
	},
	async asyncData({ $content, params, error }) {
		const post = await $content('posts/', params.slug)
			.fetch()
			.catch((err) => {
				error({ statusCode: 404, message: 'Página no encontrada' })
			})

		return {
			post,
		}
	},
	components: { SectionTitle, BackLink, PostHeader },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
/deep/ img {
	max-width: 100%;
}
</style>
