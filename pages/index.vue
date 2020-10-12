<template>
	<div class="container" id="sobre-mi">
		<div>
			<h1 class="title">{{ $t('greeting') }}</h1>

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
	components: {},
}
</script>

<style lang="scss">
</style>
