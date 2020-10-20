<template>
	<el-row :gutter="20">
		<el-col :span="8" v-for="(o, index) in items" :key="o" class="portfolio__item">
			<article>
				<a href="#">
					<el-card shadow="hover">
						<img :src="`https://source.unsplash.com/random/640x480?id=${index}`" />
						<div class="portfolio__data">
							<h1>Yummy hamburger</h1>
							<div>
								<time class="time">{{ currentDate }}</time>
								<el-button type="text" class="button">Small description</el-button>
							</div>
							<el-tag size="mini" effect="dark" color="#4FC08D">
								<img src="/images/svg/stack/vue.svg" alt="Vue" />
								<span>Vue</span>
							</el-tag>
						</div>
					</el-card>
				</a>
			</article>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: 'PortfolioGrid',
	props: {
		data: Array,
	},
	computed: {
		items() {
			// return this.data.filter((item) => item.show)
			return this.data
		},
	},
}
</script>

<style lang="scss" scoped>
.portfolio__item {
	/deep/ .el-card__body {
		padding: 0;
	}

	.portfolio__data {
		padding: 1em;
	}

	h1 {
		font-size: 1.2rem;
	}

	img {
		max-width: 100%;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
}

/deep/ .el-tag {
	* {
		vertical-align: middle;
	}

	img {
		width: auto;
		height: 1em;
		display: inline-block;
		filter: contrast(0) brightness(10);
	}
}
</style>
