<template>
	<div class="page">
		<div class="container">
			<el-row>
				<el-col :span="2">
					<MainNav />
				</el-col>
				<el-col :span="10">
					<LangSwitcher />
				</el-col>
				<el-col :span="12" class="main">
					<div class="container" id="sobre-mi">
						<div>
							<h1 class="title">{{ $t('greeting') }}</h1>
							<div class="links">
								<el-button
									v-for="post in posts"
									:key="post.slug"
									type="primary"
								>
									<a :href="`/blog/${post.slug}`">{{ post.title }}</a>
								</el-button>
								<el-button
									type="primary"
									icon="el-icon-edit"
									plain
									circle
								></el-button>
							</div>

							<Cv lang="es" />
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import Cv from '@/components/CV'
import MainNav from '@/components/global/nav'

export default {
	head() {
		return {
			title: 'My Index title',
		}
	},
	async asyncData({ $content }) {
		const posts = await $content('posts').fetch()

		return {
			posts,
		}
	},
	components: { Cv, MainNav },
	computed: {
		availableLocales() {
			return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
		},
	},
}
</script>

<style lang="scss">
.page {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	> .container {
		width: 100%;
		max-width: 1200px;
		background: $color-grayscale-1;
	}
}
</style>
