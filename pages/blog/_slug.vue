<template>
	<section class="container">
		<header class="main-header">
			<back-link :to="{ path: '/blog' }" />
			<section-title :title="post.title" :description="post.description" />
		</header>

		<section class="main-content">
			<nuxt-content :document="post" />
		</section>
	</section>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import SectionTitle from '@/components/global/SectionTitle'
import BackLink from '@/components/global/BackLink'

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
	components: { SectionTitle, BackLink },
	mixins: [Transitions],
}
</script>
