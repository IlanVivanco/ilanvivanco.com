<template>
	<div class="container resume">
		<cv />
	</div>
</template>

<script>
import Cv from '@/components/cv/Cv'

export default {
	scrollToTop: false,
	head() {
		return {
			title: 'Curricullum title',
		}
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
