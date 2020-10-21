<template>
	<div class="container" id="sobre-mi">
		<div>
			<section-title
				title="Hola Mundo"
				description=""
			/>

			<div class="links">
				<el-button v-for="post in posts" :key="post.slug" type="primary">
					<nuxt-link :to="localePath(`/blog/${post.slug}`)">{{ post.title }}</nuxt-link>
				</el-button>
				<el-button type="primary" icon="el-icon-edit" plain circle></el-button>
			</div>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste inventore consectetur aut laudantium
				mollitia sint aliquid nulla asperiores assumenda recusandae similique, non perferendis fugit reprehenderit
				cum debitis? Fuga, adipisci!
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste inventore consectetur aut laudantium
				mollitia sint aliquid nulla asperiores assumenda recusandae similique, non perferendis fugit reprehenderit
				cum debitis? Fuga, adipisci!
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste inventore consectetur aut laudantium
				mollitia sint aliquid nulla asperiores assumenda recusandae similique, non perferendis fugit reprehenderit
				cum debitis? Fuga, adipisci!
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste inventore consectetur aut laudantium
				mollitia sint aliquid nulla asperiores assumenda recusandae similique, non perferendis fugit reprehenderit
				cum debitis? Fuga, adipisci!
			</p>
		</div>
	</div>
</template>

<script>
import SectionTitle from '@/components/global/SectionTitle'

export default {
	name: 'Index',
	scrollToTop: false,
	head() {
		return {
			title: 'My Index title',
		}
	},
	async asyncData({ $content }) {
		const posts = await $content('posts').fetch()

		return {
			posts,
		}
	},
	components: {SectionTitle},
}
</script>

<style lang="scss">
</style>
