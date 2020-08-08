<template>
	<div>
		<el-menu
			:default-active="$route.path"
			mode="vertical"
			:collapse="true"
			:router="true"
		>
			<el-menu-item :index="localePath('index')">
				<i class="el-icon-user"></i>
				<span slot="title">Sobre mi</span>
			</el-menu-item>
			<el-menu-item :index="localePath('resume')">
				<i class="el-icon-tickets"></i>
				<span slot="title">Curriculum</span>
			</el-menu-item>
			<el-menu-item :index="localePath('portfolio')">
				<i class="el-icon-monitor"></i>
				<span slot="title">Trabajos</span>
			</el-menu-item>
			<el-menu-item :index="localePath('blog')">
				<i class="el-icon-notebook-1"></i>
				<span slot="title">Blog</span>
			</el-menu-item>
			<el-menu-item :index="localePath('contact-me')">
				<i class="el-icon-chat-round"></i>
				<span slot="title">Contactame</span>
			</el-menu-item>
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
