<template>
	<el-row :gutter="20" type="flex" class="portfolio">
		<el-col tag="article" :span="12" v-for="item in items" :key="item.slug" class="portfolio__item-wrapper">
			<component :is="'nuxt-link'" v-bind="linkArgs(item)" class="portfolio__link">
				<el-card shadow="hover" class="portfolio__item">
					<div class="portfolio__thumb">
						<img :src="item.thumbnail" :alt="item.title" />
					</div>
					<div class="portfolio__data">
						<time class="portfolio__date">{{ item.date }}</time>
						<h1 class="portfolio__title">{{ item.title }}</h1>
						<div class="portfolio__description">{{ item.description }}</div>
						<div class="portfolio__tags">
							<el-tag class="portfolio__tag" size="small" v-for="(tag, index) in item.tags" :key="index">
								{{ tag }}
							</el-tag>
						</div>
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
			console.log(item.createdAt)
			if (item.has_single)
				return {
					is: 'nuxt-link',
					to: this.localePath(`/portfolio/${item.slug}`),
				}

			if (item.external_link)
				return {
					is: 'a',
					href: item.external_link,
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
.portfolio {
	flex-wrap: wrap;
}

.portfolio__item-wrapper {
	margin-bottom: 20px;
}

.portfolio__link {
	height: 100%;
	text-decoration: none;
	display: block;
}

/deep/ .el-card__body {
	height: 100%;
	padding: 0;
}

.portfolio__item{
	--thumb-height: 200px;

	height: 100%;
}

.portfolio__thumb {
	height: var(--thumb-height);

	img {
		width: 100%;
		height: 100%;
		max-width: 100%;
		object-fit: cover;
		display: block;
	}
}

.portfolio__data {
	padding: 1em;
	line-height: 1.2em;
	height: calc(100% - var(--thumb-height));
	display: flex;
	flex-direction: column;
}

.portfolio__date {
	font-size: 0.8rem;
	color: $color-grayscale-5;
}

.portfolio__title {
	font-size: 1.2rem;
	color: $color-blue-dark;
	line-height: 1.4;
	margin-bottom: 0.5em;
}

.portfolio__description {
	flex-grow: 1;
	line-height: 1.4em;
	min-height: 4.2em;
	color: $color-blue;
}

.portfolio__tags {
	display: inline-block;
}

/deep/ .el-tag {
	margin-right: 0.5em;
}
</style>
