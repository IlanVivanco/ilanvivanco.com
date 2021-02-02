<template>
	<div class="container">
		<header class="main-header">
			<section-title :title="this.$t('contact_me.titles.section')" :description="this.$t('contact_me.copy.lead')" />
		</header>

		<section class="main-content">
			<contact-form netlify />
		</section>
	</div>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import SectionTitle from '@/components/global/SectionTitle'
import ContactForm from '@/components/ContactForm'

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
	components: { SectionTitle, ContactForm },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
</style>
