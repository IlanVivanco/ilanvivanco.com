<template>
	<div class="container">
		<h1 v-if="error.statusCode === 404">Page not found</h1>
		<h1 v-else>An error occurred</h1>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, veritatis, quam sint deserunt vel dolorum quod quae blanditiis eveniet id amet aperiam qui inventore necessitatibus aspernatur ad fugiat esse nam.
		<nuxt-link to="/">Home page</nuxt-link>
	</div>
</template>

<script>
export default {
	name: 'ErrorPage',
	props: ['error'],
}
</script>

<style lang="scss" scoped>
</style>
