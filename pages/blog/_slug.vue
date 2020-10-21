<template>
	<section class="container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/blog' }"><i class="el-icon-back"></i> Volver</el-breadcrumb-item>
			<el-breadcrumb-item>Blog</el-breadcrumb-item>
			<el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
		</el-breadcrumb>

		<section-title :title="post.title" :description="post.description" />
		<nuxt-content :document="post" />
	</section>
</template>

<script>
import SectionTitle from '@/components/global/SectionTitle'

export default {
	name: 'BlogSlug',
	head() {
		return {}
	},
	async asyncData({ $content, params, error }) {
		const post = await $content('posts/', params.slug)
			.fetch()
			.catch((err) => {
				error({ statusCode: 404, message: 'Página no encontrada' })
			})

		return {
			post,
		}
	},
	components: { SectionTitle },
}
</script>
