<template>
	<div class="container">
		<header class="main-header">
			<section-title :title="this.$t('blog.titles.section')" :description="this.$t('blog.copy.lead')" />
		</header>

		<section class="main-content">
			<items-grid :data="posts" :rows="2" />
		</section>
	</div>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import SectionTitle from '@/components/global/SectionTitle'
import ItemsGrid from '@/components/ItemsGrid'

export default {
	name: 'BlogPage',
	scrollToTop: false,
	head() {
		return {
			title: 'Blog',
		}
	},
	async asyncData({ app, $content }) {
		const posts = await $content(`${app.i18n.locale}/blog`).sortBy('date', 'desc').fetch()

		return {
			posts,
		}
	},
	components: { SectionTitle, ItemsGrid },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
</style>
