<template>
	<section class="container">
		<header class="main-header">
			<section-title :title="this.$t('portfolio.titles.section')" :description="this.$t('portfolio.copy.lead')" />
		</header>

		<section class="main-content">
			<items-grid :data="portfolio" />
		</section>
	</section>
</template>

<script>
import Transitions from '~/mixins/Transitions'
import ItemsGrid from '~/components/ItemsGrid'
import SectionTitle from '~/components/global/SectionTitle'

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
		return {
			portfolio: portfolio.map((item) => {
				// Require post image
				if (item.thumbnail) item.thumbnail = require(`~/assets/${item.thumbnail}`)

				return item
			}),
		}
	},
	components: { ItemsGrid, SectionTitle },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
</style>
