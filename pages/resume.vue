<template>
	<div class="container">
		<cv />
	</div>
</template>

<script>
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
	components: { Cv },
}
</script>

<style lang="scss" scoped>
</style>
