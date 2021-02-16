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
		return {
			title: this.$t('meta.portfolio_title'),
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
