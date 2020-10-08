<template>
	<section>
		<el-row align="middle" :gutter="20">
			<el-col :span="12">
				<positions :data="cvData.positions" />
			</el-col>
			<el-col :span="12">
				<positions :data="cvData.positions" />
			</el-col>
		</el-row>
	</section>
</template>

<script>
import Positions from '@/components/cv/Positions'

export default {
	name: 'CV',
	components: { Positions },
	data() {
		return {
			cvData: { positions: [] },
		}
	},
	mounted() {
		this.cvData = this.$t('cv.data')
	},
}
</script>

<style lang="scss" scoped>
</style>
