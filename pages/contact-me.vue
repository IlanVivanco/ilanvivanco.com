<template>
	<div class="container">
		<section-title
			title="Contactame"
			description="Podés encontrarme en cualquiera de mis redes sociales o, si lo preferís, llenar el siguiente formulario."
		/>

		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos natus reprehenderit sunt obcaecati distinctio
		molestias aliquid, deleniti, magnam perspiciatis expedita quia. Necessitatibus adipisci voluptas totam! Repellat
		ullam ut repudiandae cumque.
	</div>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import SectionTitle from '@/components/global/SectionTitle'

export default {
	name: 'ContactMe',
	scrollToTop: false,
	head() {
		return {
			title: 'Contact title',
		}
	},
	nuxtI18n: {
		paths: {
			es: '/contactame',
			en: '/contact-me',
		},
	},
	components: {SectionTitle},
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
</style>
