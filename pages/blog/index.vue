<template>
	<div class="container">
		<section-title title="Últimos artículos" description="" />

		<div class="links">
			<el-button v-for="post in posts" :key="post.slug" type="primary">
				<nuxt-link :to="localePath(`/blog/${post.slug}`)">{{ post.title }}</nuxt-link>
			</el-button>
			<el-button type="primary" icon="el-icon-edit" plain circle></el-button>
		</div>
	</div>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import SectionTitle from '@/components/global/SectionTitle'

export default {
	name: 'BlogPage',
	scrollToTop: false,
	head() {
		return {
			title: 'Blog',
		}
	},
	async asyncData({ $content }) {
		const posts = await $content('posts')
			.sortBy('createdAt', 'desc')
			.fetch()

		return {
			posts,
		}
	},
	components: { SectionTitle },
	mixins: [Transitions],
}
</script>

<style lang="scss" scoped>
</style>
