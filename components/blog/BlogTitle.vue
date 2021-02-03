<template>
	<div class="section-header">
		<h1 v-if="title" class="section-header__title">{{ title }}</h1>
		<p v-if="description" class="section-header__description" v-html="description"></p>
	</div>
</template>

<script>
export default {
	name: 'BlogTitle',
	props: {
		title: String,
		description: String,
	},
}
</script>

<style lang="scss" scoped>
.section-header {
	&__title {
		font-family: $code-font;
		font-size: 1.8rem;
		font-weight: normal;
		color: $color-blue-dark;
		display: flex;

		.light & {
			color: $color-white;
			text-shadow: 0 0 5px $color-blue-dark;
		}
	}

	&__description {
		color: $color-blue;
		line-height: 1.3em;
		font-style: italic;
		margin-left: 0.2em;

		.light & {
			color: $color-grayscale-3;
		}
	}
}
</style>
