<template>
	<el-row :gutter="20">
		<el-col tag="article" :span="8" v-for="item in items" :key="item.slug" class="portfolio__item">
			<component :is="'nuxt-link'" v-bind="linkArgs(item)">
				<el-card shadow="hover">
					<img :src="item.thumbnail" />
					<div class="portfolio__data">
						<h1>{{ item.title }}</h1>
						<div>
							<time class="time">{{ item.date }}</time>
							<el-button type="text" class="button">{{ item.description }}</el-button>
						</div>

						<el-tag v-for="(tag, index) in item.tags" :key="index" size="mini" color="#f9f9f9">
							{{ tag }}
						</el-tag>
					</div>
				</el-card>
			</component>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: 'PortfolioGrid',
	props: {
		data: Array,
	},
	methods: {
		linkArgs(item) {
			console.log(this.$attrs)
			if (item.has_single)
				return {
					is: 'nuxt-link',
					to: this.localePath(`/portfolio/${item.slug}`),
					class: 'portfolio__link',
				}

			if (item.external_link)
				return {
					is: 'a',
					href: item.external_link,
					class: 'portfolio__link',
					target: '_blank',
				}
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
.portfolio__item {
	h1 {
		font-size: 1.2rem;
	}

	img {
		max-width: 100%;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
}

.portfolio__link {
	text-decoration: none;
}

.portfolio__data {
	padding: 1em;
}

/deep/ {
	.el-tag {
		margin-right: 0.5em;

		* {
			vertical-align: middle;
		}

		img {
			width: auto;
			height: 1em;
			display: inline-block;
			filter: contrast(0) brightness(10);
		}
	}

	.el-card__body {
		padding: 0;
	}
}
</style>
