<template>
	<ul class="insta-feed">
		<li v-for="(photo, index) in this.count" :key="index">
			<img :src="`https://source.unsplash.com/400x400/?nature&sig=${Math.random()}`" />
		</li>
	</ul>
</template>

<script>
export default {
	name: 'FeedInstagram',
	props: {
		count:{
			type: Number,
			default: 4,
		}
	},
	methods: {},
	computed: {
		items() {
			return ''
		},
	},
}
</script>

<style lang="scss" scoped>
.insta-feed {
	margin: 0;
	padding: 0;
	display: grid;
	list-style: none;
	gap: 5px;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: minmax(75px, 115px);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>
