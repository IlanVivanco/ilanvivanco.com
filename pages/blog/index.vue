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
import DynamicImages from '~/mixins/DynamicImages'
import Transitions from '~/mixins/Transitions'
import SectionTitle from '~/components/global/SectionTitle'
import ItemsGrid from '~/components/ItemsGrid'

export default {
	name: 'BlogPage',
	scrollToTop: false,
	async asyncData({ app, $content }) {
		const posts = await $content(`${app.i18n.locale}/blog`).sortBy('date', 'desc').fetch()

		return {
			posts: posts.map((post) => {
				// Require post image
				if (post.thumbnail) post.thumbnail = DynamicImages.methods.responsiveImageAttr(post.thumbnail)


				return post
			}),
		}
	},
	components: { SectionTitle, ItemsGrid },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
</style>
