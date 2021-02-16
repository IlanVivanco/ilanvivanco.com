<template>
	<div class="container resume">
		<header class="main-header">
			<section-title :title="this.$t('resume.titles.section')" :description="this.$t('resume.copy.lead')" />
		</header>

		<section class="main-content">
			<cv />
		</section>
	</div>
</template>

<script>
import Transitions from '~/mixins/Transitions'
import SectionTitle from '~/components/global/SectionTitle'
import Cv from '~/components/cv/Cv'

export default {
	name: 'Resume',
	scrollToTop: false,
	head() {
		return {
			title: 'Curricullum title',
		}
	},
	mounted() {
		this.$eventHub.$emit('updateBannerImage', require('~/assets/images/banner.jpg'))
	},
	nuxtI18n: {
		paths: {
			en: '/resume',
			es: '/curriculum',
		},
	},
	components: { Cv, SectionTitle },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
</style>
