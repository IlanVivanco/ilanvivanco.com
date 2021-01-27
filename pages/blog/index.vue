<template>
	<div class="container">
		<header class="main-header">
			<section-title title="Últimos artículos" description="" />
		</header>

		<section class="main-content">
			<items-grid :data="posts" date-format="ll" :rows="2" />
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
	async asyncData({ $content }) {
		const posts = await $content('posts').sortBy('date', 'desc').fetch()

		console.log(posts)
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
