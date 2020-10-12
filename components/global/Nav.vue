<template>
	<div>
		<el-menu :default-active="$route.path" mode="vertical" :collapse="false" :router="true">
			<el-menu-item v-for="(item, key) of menuItems" :key="key" :index="localePath(key)">
				<i :class="item.icon"></i>
				<span slot="title">{{item.name}}</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
import es_menu from '@/locales/es/menu'
import en_menu from '@/locales/en/menu'

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
		menuItems(){
			return this.menus[this.$i18n.locale]
		}
	}
}
</script>

<style lang="scss" scoped>
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
