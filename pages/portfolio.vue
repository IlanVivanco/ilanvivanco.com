<template>
	<section class="container">
		<section-title
			title="Trabajos realizados"
			description="Estos son algunos de los trabajos que realicé en los últimos años."
		/>

		<portfolio-grid :data="3" />
	</section>
</template>

<script>
import PortfolioGrid from '@/components/PortfolioGrid'
import SectionTitle from '@/components/global/SectionTitle'

export default {
	name: 'Portfolio',
	scrollToTop: false,
	head() {
		return {
			title: 'Protfolio title',
		}
	},
	components: { PortfolioGrid, SectionTitle },
}
</script>

<style lang="scss" scoped>
</style>
