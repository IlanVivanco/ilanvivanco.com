<template>
	<div class="container" id="sobre-mi">
		<div>
			<h1 class="title">{{ $t('greeting') }}</h1>

			<div class="links">
				<el-button v-for="post in posts" :key="post.slug" type="primary">
					<a :href="`/blog/${post.slug}`">{{ post.title }}</a>
				</el-button>
				<el-button
					type="primary"
					icon="el-icon-edit"
					plain
					circle
				></el-button>
			</div>

			<Cv lang="es" />

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste
				inventore consectetur aut laudantium mollitia sint aliquid nulla
				asperiores assumenda recusandae similique, non perferendis fugit
				reprehenderit cum debitis? Fuga, adipisci!
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste
				inventore consectetur aut laudantium mollitia sint aliquid nulla
				asperiores assumenda recusandae similique, non perferendis fugit
				reprehenderit cum debitis? Fuga, adipisci!
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste
				inventore consectetur aut laudantium mollitia sint aliquid nulla
				asperiores assumenda recusandae similique, non perferendis fugit
				reprehenderit cum debitis? Fuga, adipisci!
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste
				inventore consectetur aut laudantium mollitia sint aliquid nulla
				asperiores assumenda recusandae similique, non perferendis fugit
				reprehenderit cum debitis? Fuga, adipisci!
			</p>
		</div>
	</div>
</template>

<script>
import Cv from '@/components/CV'

export default {
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
	components: { Cv },
}
</script>

<style lang="scss">
</style>
