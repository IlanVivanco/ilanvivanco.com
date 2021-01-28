<template>
	<header class="post-header" :class="{ small: size }">
		<img :src="img" :alt="alt" />
	</header>
</template>

<script>
export default {
	name: 'PostHeader',
	props: {
		img: {
			type: String,
			default: '/images/blog/mi-primer-entrada.jpg',
		},
		alt: {
			type: String,
			default: 'My title',
		},
		size: {
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
	padding-top: (100%/16 * 9);
	margin-bottom: 2rem;

	&.small {
		padding-top: (100%/30 * 9);
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
