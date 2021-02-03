<template>
	<footer class="blog-footer">
		<div class="blog-footer__meta">
			<el-row align="middle" type="flex">
				<el-col :span="2" class="blog-footer__avatar">
					<el-avatar src="/images/ilan-vivanco.jpg"></el-avatar>
				</el-col>

				<el-col :span="5" class="blog-footer__info">
					<div class="blog-footer__by">{{ this.$t('blog.copy.posted_by') }}</div>
					<div class="blog-footer__date">
						<time :datetime="post.date">{{ formatDate(post.date) }}</time>
					</div>
				</el-col>

				<el-col :span="17" class="blog-footer__tags">
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
	box-shadow:
		0 1px 1px rgba(0, 0, 0, 0.04),
		0 2px 2px rgba(0, 0, 0, 0.04),
		0 4px 4px rgba(0, 0, 0, 0.04),
		0 8px 8px rgba(0, 0, 0, 0.04);

	&__avatar {
		text-align: center;

		/deep/ img {
			object-position: 0;
		}
	}

	&__info {
		font-size: 0.9rem;
		line-height: 1.3;
		color: $color-grayscale-7;
	}

	&__date {
		font-style: italic;
		color: $color-grayscale-6;
		font-size: 0.8rem;
	}

	&__tags {
		text-align: right;
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
