<template>
	<header class="section-header" :class="{ small: type == 'h2' }">
		<component :is="titleType" v-if="title" class="section-header__title">
			<span class="section-header__arrow">-></span>
			{{ snakeCase(title) }}
			<span class="section-header__brackets">()</span>
			<span class="section-header__semicolon">;</span>
		</component>
		<p v-if="description" class="section-header__description" v-html="description"></p>
	</header>
</template>

<script>
export default {
	name: 'SectionTitle',
	props: {
		title: String,
		description: String,
		type: String,
	},
	methods: {
		snakeCase(text) {
			return text.replace(/[\s]/, '_').toLowerCase()
		},
	},
	computed: {
		titleType() {
			return this.type ? this.type : 'h1'
		},
	},
}
</script>

<style lang="scss" scoped>
.section-header {
	margin-bottom: 2.5rem;

	&.small {
		margin-bottom: 0.6em;
	}

	&__title {
		font-family: $code-font;
		font-size: 1.8rem;
		font-weight: normal;
		color: $color-blue-dark;
		display: flex;
	}

	h2#{&}__title {
		font-size: 1.2rem;
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
		color: $color-blue;
		line-height: 1.3em;
		font-style: italic;
		margin-left: 0.2em;
	}
}
</style>
