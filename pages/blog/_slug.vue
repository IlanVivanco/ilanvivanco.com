<template>
	<div>
		<h1>
			{{ post.title }}
		</h1>
		<h2>{{ post.description }}</h2>
		<nuxt-content :document="post" />
	</div>
</template>

<script>
export default {
	head() {
		return {
			link: [
				{
					rel: 'stylesheet',
					href:
						'https://fonts.googleapis.com/css2?family=Economica:ital,wght@0,400;0,600;1,400;1,600&display=swap',
				},
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap',
				},
			],
		}
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
}
</script>
