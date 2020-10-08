<template>
	<div>
		<el-menu :default-active="$route.path" mode="vertical" :collapse="true" :router="true">
			<el-tooltip effect="dark" placement="right" content="Sobre mi" :open-delay="400">
				<el-menu-item :index="localePath('index')">
					<i class="el-icon-user"></i>
				</el-menu-item>
			</el-tooltip>

			<el-tooltip effect="dark" placement="right" content="Curriculum" :open-delay="400">
				<el-menu-item :index="localePath('resume')">
					<i class="el-icon-tickets"></i>
				</el-menu-item>
			</el-tooltip>

			<el-tooltip effect="dark" placement="right" content="Trabajos" :open-delay="400">
				<el-menu-item :index="localePath('portfolio')">
					<i class="el-icon-monitor"></i>
				</el-menu-item>
			</el-tooltip>

			<el-tooltip effect="dark" placement="right" content="Blog" :open-delay="400">
				<el-menu-item :index="localePath('blog')">
					<i class="el-icon-notebook-1"></i>
				</el-menu-item>
			</el-tooltip>

			<el-tooltip effect="dark" placement="right" content="Contactame" :open-delay="400">
				<el-menu-item :index="localePath('contact-me')">
					<i class="el-icon-chat-round"></i>
				</el-menu-item>
			</el-tooltip>
		</el-menu>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		handleCollapse(event) {
			this.isCollapsed = !this.isCollapsed
		},
	},
}
</script>

<style>
</style>
