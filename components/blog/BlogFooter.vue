<template>
	<footer class="blog-footer">
		<div class="blog-footer__meta">
			<el-row align="middle" type="flex">
				<el-col :span="12">
					<div class="blog-footer__author">
						<el-avatar class="blog-footer__avatar" :src="require('~/assets/images/ilan-vivanco.jpg?size=80').src"></el-avatar>

						<div class="blog-footer__data">
							<div class="blog-footer__by">{{ this.$t('blog.copy.posted_by') }}</div>
							<div class="blog-footer__date">
								<time :datetime="post.date">{{ formatDate(post.date) }}</time>
							</div>
						</div>
					</div>
				</el-col>

				<el-col :span="12" class="blog-footer__tags">
					<el-tag class="mr2" size="small" v-for="(tag, index) in post.tags" :key="index">{{ tag }}</el-tag>
				</el-col>
			</el-row>
		</div>
	</footer>
</template>

<script>
import moment from 'moment'

export default {
	name: 'BlogFooter',
	props: {
		post: {
			type: Object,
			default: {},
		},
	},
	methods: {
		formatDate(date) {
			moment.locale(this.$i18n.locale)

			if (!date) return ''

			return moment(date).format('ll')
		},
	},
}
</script>

<style lang="scss" scoped>
.blog-footer {
	@extend .mt4;
	background: $color-grayscale-2;
	padding: 1rem;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04), 0 2px 2px rgba(0, 0, 0, 0.04), 0 4px 4px rgba(0, 0, 0, 0.04),
		0 8px 8px rgba(0, 0, 0, 0.04);

	&__author {
		display: flex;
		align-items: center;

		@include breakpoint('small') {
			margin-bottom: 1rem;
		}
	}

	&__avatar {
		width: 40px;
		margin-right: 0.5rem;

		/deep/ img {
			object-position: 0;
		}
	}

	&__date {
		font-style: italic;
		color: $color-grayscale-6;
		font-size: 0.8rem;
		line-height: 1;
	}

	&__tags {
		text-align: right;

		@include breakpoint('small') {
			text-align: left;
		}
	}

	@include breakpoint('small') {
		.el-row {
			flex-wrap: wrap;
		}

		.el-col {
			width: 100%;
		}
	}
}

/deep/ .el-tag {
	height: auto;
	line-height: 1;
	padding: 0.5em 0.6em;
	margin-top: 0.5em;
	background-color: $color-grayscale-3;
	border-color: $color-grayscale-4;
}
</style>
