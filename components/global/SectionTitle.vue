<template>
	<header class="section-header">
		<h1 v-if="title" class="section-header__title">
			<span class="section-header__arrow">-></span>
			{{ snakeCase(title) }}
			<span class="section-header__brackets">()</span>
			<span class="section-header__semicolon">;</span>
		</h1>
		<p v-if="description" class="section-header__description" v-html="description"></p>
	</header>
</template>

<script>
export default {
	name: 'SectionTitle',
	props: {
		title: String,
		description: String,
	},
	methods: {
		snakeCase(text) {
			return text.replace(/[\s]/, '_').toLowerCase()
		},
	},
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
		display: flex;
	}

	&__arrow {
		color: $color-cyan-dark;
	}

	&__brackets {
		color: $color-red-dark;
	}

	&__semicolon {
		color: $color-grayscale-5;
	}

	&__description {
		color: $color-grayscale-7;
	}
}
</style>
