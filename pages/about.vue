<template>
	<div class="container">
		<section-title title="Más info sobre mí" :description="this.$t('contact_me.copy.lead')" />
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos natus reprehenderit sunt obcaecati distinctio
			molestias aliquid, deleniti, magnam perspiciatis expedita quia. Necessitatibus adipisci voluptas totam!
			Repellat ullam ut repudiandae cumque.
		</p>
	</div>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import SectionTitle from '@/components/global/SectionTitle'

export default {
	name: 'About',
	scrollToTop: false,
	head() {
		return {
			title: 'About title',
		}
	},
	nuxtI18n: {
		paths: {
			es: '/sobre-mi',
			en: '/about',
		},
	},
	components: { SectionTitle },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
</style>
