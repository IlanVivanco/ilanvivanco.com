<template>
	<nuxt-link :to="to" class="back-link"><i class="el-icon-back"></i> Volver</nuxt-link>
</template>

<script>
export default {
	name: 'BackLink',
	props: {
		to: String,
	},
}
</script>

<style lang="scss" scoped>
.back-link {
	text-decoration: none;
	color: $color-grayscale-7;
	font-weight: 400;
}
</style>
