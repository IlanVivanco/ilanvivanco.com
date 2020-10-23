<template>
	<div class="section-header" v-if="title">
		<div v-if="icon" class="section-header__icon"><i :class="icon"></i></div>
		<h2 class="section-header__title">{{ title }}</h2>
	</div>
</template>

<script>
export default {
	name: 'SectionHeader',
	props: {
		title: String,
		icon: String,
	},
}
</script>

<style lang="scss" scoped>
.section-header {
	display: flex;
	align-items: center;
	margin-bottom: 1em;
}

.section-header__icon {
	background: $color-blue-dark;
	color: white;
	width: 2em;
	text-align: center;
	line-height: 2em;
	border-radius: 50%;
	margin: 0.8em 1em 0 -0.3em;
}

.section-header__title {
	flex-grow: 1;
	border-bottom: 2px dotted $color-blue-dark;
	margin: 0;
	text-align: right;
	color: $color-blue-dark;
	text-transform: uppercase;
	font-weight: 600;
	font-size: 0.9rem;
	font-family: $primary-alt-font;
}
</style>
