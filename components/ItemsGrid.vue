<template>
	<el-row :gutter="20" type="flex" class="grid">
		<el-col tag="article" :span="calcRows()" v-for="item in items" :key="item.slug" class="grid__item-wrapper">
			<el-card shadow="hover" class="grid__item" :class="{ 'post-hidden': !item.show }">
				<div class="grid__thumb">
					<component :is="'nuxt-link'" v-bind="linkArgs(item)" class="grid__link">
						<img v-bind="item.thumbnail" :alt="item.title" />
						<el-button
							class="grid__more"
							size="small"
							:icon="isInternalLink(item) ? 'el-icon-plus' : 'el-icon-link'"
							circle
						></el-button>
					</component>
				</div>
				<div class="grid__data">
					<time class="grid__date">{{ formatDate(item.date) }}</time>
					<h1 class="grid__title">{{ item.title }}</h1>
					<div class="grid__for" v-if="item.job_for">
						{{ $t('portfolio.titles.for') }}
						<a :href="item.job_for.link" target="_blank" rel="nofollow">{{ item.job_for.name }}</a>
					</div>
					<div class="grid__description">{{ item.description }}</div>
					<div class="grid__tags">
						<el-tag class="grid__tag mr2" size="small" v-for="(tag, index) in item.tags" :key="index">
							{{ tag }}
						</el-tag>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
import moment from 'moment'

export default {
	name: 'ItemsGrid',
	props: {
		data: {
			type: Array,
			default: [],
		},
		dateFormat: {
			type: String,
			default: 'll',
		},
		rows: {
			type: Number,
			default: 3,
		},
	},
	methods: {
		linkArgs(item) {
			if (this.isInternalLink(item))
				return {
					is: 'nuxt-link',
					to: item.path.replace(`/${this.$i18n.defaultLocale}`, ''),
				}

			if (item.external_link)
				return {
					is: 'a',
					href: item.external_link,
					target: '_blank',
				}
		},

		isInternalLink(item) {
			return item.has_single || item.dir.indexOf('blog') > 0
		},

		formatDate(date) {
			moment.locale(this.$i18n.locale)

			if (!date) return ''

			return moment(date).format(this.dateFormat)
		},

		calcRows() {
			const TOTALCOLS = 24
			return Math.floor(TOTALCOLS / this.rows)
		},
	},
	computed: {
		items() {
			// Show all posts in dev
			if (process.env.NODE_ENV == 'development') return this.data

			return this.data.filter((item) => item.show)
		},
	},
}
</script>

<style lang="scss" scoped>
.grid {
	flex-wrap: wrap;
}

.grid__item-wrapper {
	margin-bottom: 20px;

	@include breakpoint('medium') {
		width: 50%;
	}

	@include breakpoint('tiny') {
		width: 100%;
	}
}

::v-deep .el-card__body {
	height: 100%;
	padding: 0;
}

.grid__item {
	--thumb-height: 160px;
	height: 100%;

	@include breakpoint('small') {
		--thumb-height: 20vw;
	}

	@include breakpoint('tiny') {
		--thumb-height: 40vw;
	}

	&.post-hidden {
		opacity: 0.5;
	}
}

.grid__thumb {
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

		.grid__item:hover & {
			transform: scale(1.05);
			filter: saturate(100%);
		}
	}
}

.grid__more {
	text-decoration: none;
	position: absolute;
	bottom: 1em;
	right: 1em;
	background: $color-red-dark;
	color: $color-grayscale-1;
	border-color: $color-red-dark;

	.grid__link:hover & {
		color: $color-red-dark;
		background: $color-grayscale-1;
		border-color: $color-grayscale-2;
	}
}

.grid__data {
	padding: 1em;
	line-height: 1.2em;
	height: calc(100% - var(--thumb-height));
	display: flex;
	flex-direction: column;
}

.grid__date {
	font-size: 0.8rem;
	color: $color-grayscale-5;
}

.grid__title {
	font-size: 1.1rem;
	color: $color-blue-dark;
	margin-bottom: 0.5em;
}

.grid__description {
	flex-grow: 1;
	color: $color-blue;
	font-size: 0.8em;
	line-height: 1.3em;
	min-height: 4.2em;
	font-style: italic;
	margin-bottom: 0.5em;
}

.grid__for {
	color: $color-blue;
	font-size: 0.8em;
	line-height: 1.3em;
	font-style: italic;
	margin-bottom: 1em;

	a {
		color: inherit;
	}
}

.grid__tags {
	margin-top: 0.5rem;
}

::v-deep .el-tag {
	height: auto;
	font-size: 0.6rem;
	line-height: 1;
	padding: 0.5em 0.6em;
	margin-top: 0.5em;
	background-color: $color-grayscale-2;
	border-color: $color-grayscale-3;
}
</style>
