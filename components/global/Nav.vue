<template>
	<div>
		<el-menu :default-active="$route.path" mode="vertical" :collapse="false" :router="true">
			<el-menu-item :index="localePath('index')">
				<i class="el-icon-user"></i>
				<span slot="title">Sobre mi</span>
			</el-menu-item>

			<el-menu-item :index="localePath('resume')">
				<i class="el-icon-tickets"></i>
				<span slot="title">CV</span>
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
				<span slot="title">Contacto</span>
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

<style lang="scss">
.el-menu-item {
	line-height: 1;
	width: 100%;
	height: auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: 1em 0.8em !important;

	[class^='el-icon'] {
		margin: 0;
		margin-bottom: 0.5em;
	}

	span {
		// display: none;

		// @media screen and (max-width: 1220px) {
		display: block;
		width: 100%;
		text-align: center;
		text-transform: uppercase;
		font-size: 10px;
		// }
	}
}
</style>
