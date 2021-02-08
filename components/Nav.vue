<template>
	<nav>
		<el-menu :default-active="$route.path" mode="vertical" :collapse="false" :router="true">
			<el-menu-item v-for="(menu, key) of menuItems" :key="key" :index="localePath(menu.slug)">
				<i :class="menu.icon"></i>
				<span slot="title">{{ menu.name }}</span>
			</el-menu-item>
		</el-menu>
	</nav>
</template>

<script>
import es_menu from '~/locales/es/menu'
import en_menu from '~/locales/en/menu'

export default {
	data() {
		return {
			menus: {},
		}
	},
	methods: {
		handleCollapse(event) {
			this.isCollapsed = !this.isCollapsed
		},
	},
	mounted() {
		this.menus = {
			es: es_menu,
			en: en_menu,
		}
	},
	computed: {
		localizedMenu() {
			return this.menus[this.$i18n.locale] || []
		},

		menuItems() {
			return this.localizedMenu.filter((menu) => menu.show)
		},
	},
}
</script>

<style lang="scss" scoped>
.el-menu {
	@include breakpoint('small') {
		display: flex;
	}
}

.el-menu-item {
	line-height: 1;
	width: 100%;
	height: auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: 1em 0.8em !important;


	&:hover {
		color: $color-teal-dark;
	}

	[class^='el-icon'] {
		margin: 0;
		margin-bottom: 0.5em;
		color: inherit
	}

	span {
		display: block;
		width: 100%;
		text-align: center;
		text-transform: uppercase;
		font-size: 10px;
	}
}
</style>
