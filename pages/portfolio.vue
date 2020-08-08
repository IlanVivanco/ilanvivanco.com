<template>
	<div class="page">
		<div class="container">
			<el-row>
				<el-col :span="2">
					<MainNav />
				</el-col>
				<el-col :span="10">
					<h2>
						Portfolio
					</h2>
				</el-col>
				<el-col :span="12" class="main">
					<div class="container">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
						natus reprehenderit sunt obcaecati distinctio molestias
						aliquid, deleniti, magnam perspiciatis expedita quia.
						Necessitatibus adipisci voluptas totam! Repellat ullam ut
						repudiandae cumque.
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import MainNav from '@/components/homepage/nav'

export default {
	head() {
		return {
			title: 'Protfolio title',
		}
	},
	components: {
		MainNav,
	},
}
</script>

<style lang="scss" scoped>
</style>
