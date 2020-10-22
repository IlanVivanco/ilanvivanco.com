<template>
	<el-row :gutter="20" type="flex" class="portfolio">
		<el-col tag="article" :span="8" v-for="item in items" :key="item.slug" class="portfolio__item-wrapper">
			<el-card shadow="hover" class="portfolio__item">
				<div class="portfolio__thumb">
					<component :is="'nuxt-link'" v-bind="linkArgs(item)" class="portfolio__link">
						<img :src="item.thumbnail" :alt="item.title" />
						<el-button
							class="portfolio__more"
							size="small"
							:icon="item.has_single ? 'el-icon-plus' : 'el-icon-link'"
							circle
						></el-button>
					</component>
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

	@include breakpoint('medium'){
		width: 50%;
	}

	@include breakpoint('tiny'){
		width: 100%;
	}
}

/deep/ .el-card__body {
	height: 100%;
	padding: 0;
}

.portfolio__item {
	--thumb-height: 160px;
	height: 100%;

	@include breakpoint('small'){
	--thumb-height: 20vw;
	}

	@include breakpoint('tiny'){
	--thumb-height: 40vw;
	}
}

.portfolio__thumb {
	height: var(--thumb-height);
	position: relative;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		max-width: 100%;
		object-fit: cover;
		display: block;
		transition: all 0.8s ease;
		filter: saturate(50%);

		.portfolio__item:hover & {
			transform: scale(1.05);
			filter: saturate(100%);
		}
	}
}

.portfolio__link {
}

.portfolio__more {
	text-decoration: none;
	position: absolute;
	bottom: 1em;
	right: 1em;
	background: $color-red-dark;
	color: $color-grayscale-1;
	border-color: $color-red-dark;

	.portfolio__link:hover & {
		color: $color-red-dark;
		background: $color-grayscale-1;
		border-color: $color-grayscale-2;
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
	font-size: 1.1rem;
	color: $color-blue-dark;
	margin-bottom: 0.5em;
}

.portfolio__description {
	flex-grow: 1;
	color: $color-blue;
	font-size: 0.8em;
	line-height: 1.3em;
	min-height: 4.2em;
	font-style: italic;
	margin-bottom: 0.5em;
}

.portfolio__tags {
	display: inline-block;
}

/deep/ .el-tag {
	height: auto;
	font-size: 0.6rem;
	margin-right: 0.5em;
	line-height: 1;
	padding: 0.5em 0.6em;
	margin-top: 0.5em;
	background-color: $color-grayscale-2;
	border-color: $color-grayscale-3;
}
</style>
