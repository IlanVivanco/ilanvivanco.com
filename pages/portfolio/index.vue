<template>
	<section class="container">
		<section-title
			title="Mis trabajos"
			description="En estos útimos 15 años programé una gran variedad de sitios web. <br> Estos son sólo algunos de mis favoritos."
		/>

		<portfolio-grid :data="portfolio" />
	</section>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import PortfolioGrid from '@/components/PortfolioGrid'
import SectionTitle from '@/components/global/SectionTitle'

export default {
	name: 'PortfolioPage',
	scrollToTop: false,
	head() {
		return {
			title: 'Protfolio title',
		}
	},
	async asyncData({ $content }) {
		const portfolio = await $content('portfolio').sortBy('date', 'desc').fetch()
		return { portfolio }
	},
	components: { PortfolioGrid, SectionTitle },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
</style>
