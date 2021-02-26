<template>
	<section class="container">
		<header class="main-header">
			<section-title :title="this.$t('portfolio.titles.section')" :description="this.$t('portfolio.copy.lead')" />
		</header>

		<section class="main-content">
			<items-grid :data="portfolio" date-format="MMM YYYY" />
		</section>
	</section>
</template>

<script>
import DynamicImages from '~/mixins/DynamicImages'
import Transitions from '~/mixins/Transitions'
import ItemsGrid from '~/components/ItemsGrid'
import SectionTitle from '~/components/global/SectionTitle'

export default {
	name: 'PortfolioPage',
	scrollToTop: false,
	async asyncData({ app, $content }) {
		const portfolio = await $content(`${app.i18n.locale}/portfolio`).sortBy('date', 'desc').fetch()

		return {
			portfolio: portfolio.map((item) => {
				// Require post image
				if (item.thumbnail) item.thumbnail = DynamicImages.methods.responsiveImageAttr(item.thumbnail)

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
