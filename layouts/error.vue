<template>
	<div class="container error-404 main-content">
		<div class="error-404__message">
			<div class="robot-wrapper">
				<h2>{{ error.statusCode }}</h2>
				<img src="~/assets/images/404.png" alt="Not found" />
			</div>

			<h1 v-if="error.statusCode === 404">{{ $t('general.not_found') }}</h1>
			<h1 v-else>{{ $t('general.error') }}</h1>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ErrorPage',
	props: ['error'],
	head() {
		return {
			titleTemplate: `${this.$t('general.error')} - ${this.$t('meta.name')}`,
		}
	},
}
</script>

<style lang="scss" scoped>
.robot-wrapper {
	position: relative;

	h2 {
		font-size: 3rem;
		position: absolute;
		font-weight: bold;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
		color: $color-blue-dark;

		@supports (-webkit-text-stroke: 2px $color-blue-dark) {
			color: $color-white;
			-webkit-text-stroke: 2px $color-blue-dark;
		}
	}
}

.error-404 {
	display: grid;
	place-items: center;

	&__message {
		width: 50%;
		text-align: center;

		h1 {
			text-align: center;
			font-weight: normal;
		}

		img {
			max-width: 100%;
			opacity: 0.9;
		}
	}
}
</style>
