<template>
	<div class="lang-switcher">
		<el-tooltip v-for="locale in availableLocales" :key="locale.code" :content="locale.name" placement="bottom">
			<img @click="changeLocale(locale.code)" :src="locale.icon" :alt="`locale.name flag`" class="flag" />
		</el-tooltip>
	</div>
</template>

<script>
export default {
	name: 'LangSwitcher',
	methods: {
		changeLocale(lang) {
			this.$router.push(this.switchLocalePath(lang))
		},
	},
	computed: {
		availableLocales() {
			return this.$i18n.locales.filter((locale) => locale.code !== this.$i18n.locale)
		},
	},
}
</script>

<style lang="scss">
.lang-switcher {
	position: fixed;
	right: 0;
	top: 0;
	padding: 0.5rem;
	color: $color-grayscale-6;
	text-transform: uppercase;

	.flag {
		width: 20px;
		height: 20px;
		cursor: pointer;
		transition: all ease 0.4s;

		&:not(:last-child) {
			margin-right: 0.5rem;
		}

		&:hover {
			transform: scale(1.1);
		}
	}
}
</style>
