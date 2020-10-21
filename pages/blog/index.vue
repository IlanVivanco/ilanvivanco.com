<template>
	<div class="container">
		<section-title title="Últimos artículos" description="" />

		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos natus reprehenderit sunt obcaecati distinctio
		molestias aliquid, deleniti, magnam perspiciatis expedita quia. Necessitatibus adipisci voluptas totam! Repellat
		ullam ut repudiandae cumque.
	</div>
</template>

<script>
import SectionTitle from '@/components/global/SectionTitle'

export default {
	name: 'Blog',
	scrollToTop: false,
	head() {
		return {
			title: 'Blog',
		}
	},
	components: { SectionTitle },
}
</script>

<style lang="scss" scoped>
</style>
