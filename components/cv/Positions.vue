<template>
	<el-timeline>
		<el-timeline-item
			v-for="(position, index) in orderedPositions"
			:key="index"
			:color="is_active(position) ? '#2c979f' : '#475b7d'"
			:class="['position', is_active(position) ? 'active' : '']"
		>
			<div class="position__date">
				<time :datetime="formatDatetime(position.from)">
					{{ formatDate(position.from) }}
				</time>
				-
				<time :datetime="formatDatetime(position.to)">
					{{ formatDate(position.to) }}
				</time>
			</div>

			<header class="position__header">
				<h2 class="position__company">{{ position.company }}</h2>
				<h3 class="position__name">{{ position.position }}</h3>
			</header>

			<p class="position__details" v-html="position.details"></p>
		</el-timeline-item>
	</el-timeline>
</template>

<script>
import moment from 'moment'

export default {
	name: 'Positions',
	props: {
		data: Array,
	},
	methods: {
		is_active(position) {
			return position.to === ''
		},
		formatDate(date) {
			moment.locale(this.$i18n.locale)

			if (!date) return this.$t('cv.present')

			return moment(date).format('MM/YYYY')
		},
		formatDatetime(date) {
			return date ? date : moment().format('YYYY-MM')
		},
	},
	computed: {
		orderedPositions() {
			moment.locale(this.$i18n.locale)

			return this.data.concat().sort((a, b) => {
				let aTo = a.to ? moment(a.to) : moment()
				let bTo = b.to ? moment(b.to) : moment()

				return new Date(aTo) > new Date(bTo) ? -1 : 1
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.el-timeline {
	margin-top: 1.5em;
	padding: 0 0 0 0.5em;
}

.position {
	--active-color: #{$color-blue};
	color: $color-text-regular;
	line-height: 1.4em;
	font-size: 1rem;

	&:last-child {
		padding: 0;
	}

	&.active {
		--active-color: #{$color-teal-dark};
	}

	&__content {
		font-size: 0.9em;
		line-height: 1.3;
	}

	&__header {
		line-height: 1.2;
		display: flex;
		align-items: center;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
	}

	&__company {
		color: $color-text-primary;
		font-weight: bold;
		font-size: 1em;
		margin-right: 0.2em;

		&::after {
			content: ' — ';
			font-weight: normal;
		}
	}

	&__name {
		font-size: 1em;
		font-weight: normal;
		color: $color-teal-dark;
		font-style: italic;
	}

	&__date {
		display: inline-block;
		background: var(--active-color);
		padding: 0 0.6em;
		border-radius: 0.2em;
		position: relative;
		transform: translateY(-3px);

		font-size: 0.7em;
		font-weight: normal;
		font-style: italic;
		color: $color-white;

		&::after {
			content: '';
			display: block;
			position: absolute;
			border: 4px solid transparent;
			left: -8px;
			top: 50%;
			transform: translateY(-50%);
			border-right-color: var(--active-color);
		}
	}

	&__details {
		font-size: 0.9em;
		font-style: italic;
		line-height: 1.3em;
		list-style: none;
	}

	& ::v-deep .el-timeline-item__tail {
		border-left-color: $color-blue-dark;
	}

	&.active ::v-deep .el-timeline-item__tail {
		border-left-color: $color-teal-dark;
	}
}
</style>
