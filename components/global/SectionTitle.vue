<template>
	<header class="section-header">
		<h1 v-if="title" class="section-header__title">{{ snakeCase(title) }}</h1>
		<p v-if="description" class="section-header__description">{{ description }}</p>
	</header>
</template>

<script>
import utils from '@/mixins/Utils'

export default {
	name: 'SectionTitle',
	props: {
		title: String,
		description: String,
	},
	mixins: [utils],
}
</script>

<style lang="scss" scoped>
.section-header {
	margin-bottom: 2.5rem;

	&__title {
		font-family: $code-font;
		font-size: 1.8rem;
		font-weight: normal;
		color: $color-blue-dark;

		&::before {
			content: '->';
			color: $color-cyan-dark;
		}

		&::after {
			content: '()';
			color: $color-red-dark;
		}
	}

	&__description {
		color: $color-grayscale-7;
	}
}
</style>
