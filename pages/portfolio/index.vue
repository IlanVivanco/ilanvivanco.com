<template>
	<section class="container">
		<section-title
			title="Trabajos realizados"
			description="Estos son algunos de los trabajos que realicé en los últimos años."
		/>

		<portfolio-grid :data="portfolio" />
	</section>
</template>

<script>
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
		const portfolio = await $content('portfolio')
			.sortBy('createdAt', 'desc')
			.fetch()

		return {
			portfolio,
		}
	},
	components: { PortfolioGrid, SectionTitle },
}
</script>

<style lang="scss" scoped>
</style>
