<template>
	<section class="container">
		<section-title
			:title="this.$t('portfolio.titles.section')"
			:description="this.$t('portfolio.copy.lead')"
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
