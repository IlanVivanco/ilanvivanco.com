<template>
	<section class="container">
		<back-link :to="{ path: '/blog' }" />

		<section-title :title="post.title" :description="post.description" />
		<nuxt-content :document="post" />
	</section>
</template>

<script>
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
}
</script>
