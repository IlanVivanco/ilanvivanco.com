<template>
	<section class="container">
		<header class="main-header light">
			<back-link :to="{ path: localePath('/portfolio') }" />
			<section-title :title="post.title" :description="post.description" />
		</header>

		<section class="main-content">
			<nuxt-content :document="post" />
		</section>
	</section>
</template>

<script>
import Transitions from '~/mixins/Transitions'
import SectionTitle from '~/components/global/SectionTitle'
import BackLink from '~/components/global/BackLink'

export default {
	name: 'PortfolioItems',
	head() {
		return {}
	},
	async asyncData({ $content, params, error, redirect, app }) {
		const post = await $content('portfolio/', params.slug)
			.fetch()
			.catch((err) => {
				error({ statusCode: 404 })
			})

		// Redirect if not single available
		if (post && !post.has_single) redirect({ path: app.localePath('/portfolio') })

		// Require post image
		if (post.thumbnail) post.thumbnail = require(`~/assets/${post.thumbnail}`)

		return { post }
	},
	components: { SectionTitle, BackLink },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
/deep/ img {
	max-width: 100%;
}
</style>
