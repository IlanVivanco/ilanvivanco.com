<template>
	<header v-if="post.show_thumbnail" class="post-header" :class="{ small }">
		<img v-bind="post.thumbnail" :alt="post.title" />
	</header>
</template>

<script>
export default {
	name: 'PostHeader',
	props: {
		post: {
			type: Object,
			default: {},
		},
		small: {
			type: Boolean,
			default: true,
		},
	},
	methods: {},
	computed: {},
}
</script>

<style lang="scss" scoped>
.post-header {
	position: relative;
	padding-top: calc(100% / 16 * 9);
	margin-bottom: 2rem;

	&.small {
		padding-top: calc(100% / 30 * 9);
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>
