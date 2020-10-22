<template>
	<section class="container">
		<back-link :to="{ path: '/portfolio' }" />

		<section-title :title="post.title" :description="post.description" />
		<nuxt-content :document="post" />
	</section>
</template>

<script>
import SectionTitle from '@/components/global/SectionTitle'
import BackLink from '@/components/global/BackLink'

export default {
	name: 'PortfolioItems',
	head() {
		return {}
	},
	async asyncData({ $content, params, error, redirect }) {
		const post = await $content('portfolio/', params.slug)
			.fetch()
			.catch((err) => {
				error({ statusCode: 404, message: 'Página no encontrada' })
			})

		// Redirect if not single available
		if ( post && !post.has_single) redirect('/portfolio')

		return { post }
	},
	components: { SectionTitle, BackLink },
}
</script>
