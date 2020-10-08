<template>
	<h1 title="Ilán Vivanco" class="logo text">
		<img src="@/static/images/svg/ilan-vivanco-iso.svg" alt="Ilán Vivanco" class="logo__iso" />
		<span class="logo__name">ilán vivanco</span>
	</h1>
</template>

<script>
export default {
	name: 'Logo',
}
</script>

<style lang="scss" scoped>
.logo.text {
	margin: 0;
	line-height: 40px;
	margin: 1rem 0 0.5rem;

	& .logo__iso {
		vertical-align: bottom;
		width: 56px;
		height: 40px;
		display: inline-block;
	}

	& .logo__name {
		vertical-align: bottom;
		display: inline-block;
		color: $color-blue-dark;
		letter-spacing: -0.6px;
		// transform: translateY(-4px);
	}
}
</style>
