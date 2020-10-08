<template>
	<el-timeline>
		<el-timeline-item
			v-for="(position, index) in orderedPositions"
			:key="index"
			:color="is_active(position) ? '#2c979f' : '#919699'"
			:class="['position', is_active(position) ? 'active' : '']"
		>
			<div class="position__date">
				<time :datetime="format_datetime(position.from)">
					{{ format_date(position.from) }}
				</time>
				-
				<time :datetime="format_datetime(position.to)">
					{{ format_date(position.to) }}
				</time>
			</div>
			<h2 class="position__company">{{ position.company }}</h2>
			<h3 class="position__name">{{ position.name }}</h3>
			<div class="position__excerpt">{{ position.excerpt }}</div>
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
		format_date(date) {
			if (!date) return this.$t('cv.present')

			return moment(date).format('MM/YYYY')
		},
		format_datetime(date) {
			return date ? date : moment().format('YYYY-MM')
		},
	},
	computed: {
		orderedPositions() {
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
	padding: 0;
}

.position {
	--active-color: #{$color-grayscale-6};
	color: $color-text-regular;
	line-height: 1.4em;
	font-size: 1rem;

	&.active {
		--active-color: #{$color-teal-dark};
	}

	&__company {
		color: $color-text-primary;
		font-weight: bold;
		text-transform: uppercase;
		font-size: 1em;
	}

	&__date {
		display: inline-block;
		background: var(--active-color);
		padding: 0.2em 0.6em;
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

	&__name {
		font-size: 0.9em;
		font-weight: bold;
	}

	&__excerpt {
		font-size: 0.9em;
		font-style: italic;
	}

	& /deep/ .el-timeline-item__tail {
		border-left-color: $color-grayscale-6;
	}

	&.active /deep/ .el-timeline-item__tail {
		border-left-color: $color-teal-dark;
	}
}
</style>
