<template>
	<el-timeline>
		<el-timeline-item v-for="(study, index) in studies" :key="index" class="study" :color="'#475b7d'">
			<h1 class="study__place">{{ study.school }}</h1>
			<div class="study__date">
				(<time :datetime="format_date(study.from)">{{ format_date(study.from) }}</time>
				-
				<time :datetime="format_date(study.to)">{{ format_date(study.to) }}</time
				>)
			</div>
			<ul class="study__excerpt">
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
		format_date(date) {
			return moment(date).format('YYYY')
		},
	},
	computed: {
		studies() {
			return this.data
		},
	},
}
</script>

<style lang="scss" scoped>
.el-timeline {
	margin-top: 1.5em;
	padding: 0 0 0 0.5em;
}

.study {
	--active-color: #{$color-grayscale-4};
	color: $color-text-regular;
	line-height: 1.4em;
	font-size: 1rem;

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

	&__excerpt {
		font-size: 0.9em;
		font-style: italic;
		padding-left: 1em;
		list-style: none;

		li {
			position: relative;

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

	& /deep/ .el-timeline-item__tail {
		border-left-color: $color-blue-dark;
	}
}
</style>
