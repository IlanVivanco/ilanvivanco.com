<template>
	<vue-word-cloud
		class="cloud"
		color="#5c6c89"
		font-family="Fira Sans"
		rotation-unit="deg"
		:font-size-ratio="2"
		:spacing="0.6"
		:words="data"
	>
		<template #default="{text}">
			<span :title="text">{{ text }}</span>
		</template>
	</vue-word-cloud>
</template>

<script>
import VueWordCloud from 'vuewordcloud'

export default {
	name: 'Cloud',
	props: {
		data: Array,
	},
	components: {
		VueWordCloud,
	},
}
</script>

<style lang="scss" scoped>
.cloud {
	height: 150px !important;
}
</style>
