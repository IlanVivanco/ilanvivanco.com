<template>
	<section class="container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/portfolio' }"><i class="el-icon-back"></i> Volver</el-breadcrumb-item>
			<el-breadcrumb-item>Trabajos</el-breadcrumb-item>
			<el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
		</el-breadcrumb>

		<section-title :title="post.title" :description="post.description" />
		<nuxt-content :document="post" />
	</section>
</template>

<script>
export default {
	name: 'PortfolioSlug',
	head() {
		return {}
	},
	async asyncData({ $content, params, error }) {
		const post = await $content('portfolio/', params.slug)
			.fetch()
			.catch((err) => {
				error({ statusCode: 404, message: 'Página no encontrada' })
			})

		return {
			post,
		}
	},
}
</script>
