<template>
	<el-timeline>
		<el-timeline-item v-for="(study, index) in orderedStudies" :key="index" class="institution" :color="'#475b7d'">
			<h1 class="institution__place">{{ study.place }}</h1>
			<div class="institution__date">
				(<time :datetime="formatDatetime(study.from)">{{ formatDate(study.from) }}</time>
				-
				<time :datetime="formatDatetime(study.to)">{{ formatDate(study.to) }}</time
				>)
			</div>
			<ul class="institution__list">
				<li v-for="(title, key) in study.titles" :key="key">{{ title }}</li>
			</ul>
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
		isActive(position) {
			return position.to === ''
		},
		formatDate(date) {
			moment.locale(this.$i18n.locale)

			if (!date) return this.$t('cv.present')

			return moment(date).format('YYYY')
		},
		formatDatetime(date) {
			moment.locale(this.$i18n.locale)

			return date ? date : moment().format('YYYY')
		},
	},
	computed: {
		orderedStudies() {
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

.institution {
	--active-color: #{$color-grayscale-4};
	color: $color-text-regular;
	line-height: 1.4em;
	font-size: 1rem;

	&:last-child {
		padding: 0;
	}

	&__place {
		color: $color-text-primary;
		font-weight: bold;
		font-size: 1em;
		display: inline-block;
	}

	&__date {
		display: inline-block;
		font-size: 0.8em;
		color: $color-teal-dark;
	}

	&__list {
		font-size: 0.9em;
		font-style: italic;
		padding-left: 1em;
		list-style: none;

		li {
			position: relative;
			line-height: 1.2;
			margin-bottom: 0.2em;

			&::before {
				content: '';
				width: 0.3em;
				height: 0.3em;
				position: absolute;
				display: block;
				border-radius: 50%;
				border: 1px solid $color-teal-dark;
				top: 50%;
				left: -0.7em;
				transform: translateY(-50%);
			}
		}
	}

	& ::v-deep .el-timeline-item__tail {
		border-left-color: $color-blue-dark;
	}
}
</style>
