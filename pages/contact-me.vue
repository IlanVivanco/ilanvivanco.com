<template>
	<div class="container">
		<section-title
			:title="this.$t('contact_me.titles.section')"
			:description="this.$t('contact_me.copy.lead')"
		/>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos natus reprehenderit sunt obcaecati distinctio
			molestias aliquid, deleniti, magnam perspiciatis expedita quia. Necessitatibus adipisci voluptas totam! Repellat
			ullam ut repudiandae cumque.
		</p>
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
