<template>
	<div class="page">
		<el-container>
			<el-row>
				<el-col :span="2">2</el-col>
				<el-col :span="10">10</el-col>
				<el-col :span="12">12</el-col>
			</el-row>
		</el-container>

		<div class="container">
			<div>
				<h1 class="title">
					ilanvivanco.com
				</h1>
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
			</div>
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
	components: {
		Cv,
	},
}
</script>

<style lang="scss">
@import '@/assets/css/variables';

.page {
	max-width: 1200px;
	margin: 0 auto;
	height: 90vh;
	background: $color-grayscale-1;
}
</style>
