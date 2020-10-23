<template>
	<div class="container">
		<section-title
			title="Mi historial"
			description="A lo largo de los años acumulé experiencia en varios ámbitos."
		/>
		<cv />
	</div>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import SectionTitle from '@/components/global/SectionTitle'
import Cv from '@/components/cv/Cv'

export default {
	name: 'Resume',
	scrollToTop: false,
	head() {
		return {
			title: 'Curricullum title',
		}
	},
	mounted() {
		this.$eventHub.$emit('updateBannerImage', '/images/banner.jpg')
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
