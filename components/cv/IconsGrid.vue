<template>
	<ul class="icons-grid" :class="[size]">
		<template v-for="item in items">
			<el-tooltip
				placement="top"
				popper-class="icon-popper"
				:enterable="false"
				:content="item.name"
				:key="item.name"
				:open-delay="200"
			>
				<li :style="`--bg: ${item.color}`"><img :src="require(`~/assets/${item.icon}`)" :alt="item.name" /></li>
			</el-tooltip>
		</template>
	</ul>
</template>

<script>
export default {
	name: 'IconsGrid',
	props: {
		data: Array,
		size: {
			Type: String,
			default: 'small',
		},
	},
	computed: {
		items() {
			return this.data.filter((item) => item.show)
		},
	},
}
</script>

<style lang="scss" scoped>
.icons-grid {
	--size: 2em;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(var(--size), 1fr));
	align-items: center;
	justify-items: center;
	gap: 0.5em;
	padding: 0 0.5em;
	margin: 0;

	&.medium {
		--size: 2.2em;
	}

	&.big {
		--size: 2.6em;
	}

	li {
		--bg: $color-blue-light;
		display: flex;
		align-items: center;
		justify-content: center;
		list-style: none;
		background: var(--bg);
		color: white;
		border-radius: 50%;
		width: var(--size);
		height: var(--size);
		filter: saturate(0.1);
		transition: all 0.2s ease-in-out;

		&:hover {
			filter: none;
		}

		img {
			width: 50%;
			height: auto;
			filter: contrast(0) brightness(10);

			&.dark {
				filter: none;
			}
		}
	}
}
</style>

<style lang="scss">
.el-tooltip__popper.icon-popper {
	box-shadow: 0 0 10px white;
	color: $color-white;
	background: $color-blue;

	.popper__arrow {
		border-top-color: $color-blue;

		&::after {
			border-top-color: $color-blue;
		}
	}
}
</style>
