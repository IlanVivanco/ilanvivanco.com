<template>
	<nuxt-link :to="to" class="back-link"><i class="el-icon-back"></i> Volver</nuxt-link>
</template>

<script>
export default {
	name: 'BackLink',
	props: {
		to: {
			type: Object,
			default() {
				return { path: '/' }
			},
		},
	},
}
</script>

<style lang="scss" scoped>
.back-link {
	display: block;
	text-decoration: none;
	font-weight: 400;
	font-size: 0.8rem;
	color: $color-grayscale-7;
	margin-bottom: 0.8em;

	.light &{
		color: $color-grayscale-3;
	}

	&:hover {
		color: $color-teal-dark;
	}
}
</style>
