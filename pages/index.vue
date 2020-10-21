<template>
	<div class="container" id="sobre-mi">
		<div>
			<section-title
				title="Hola Mundo"
				description=""
			/>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste inventore consectetur aut laudantium
				mollitia sint aliquid nulla asperiores assumenda recusandae similique, non perferendis fugit reprehenderit
				cum debitis? Fuga, adipisci!
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste inventore consectetur aut laudantium
				mollitia sint aliquid nulla asperiores assumenda recusandae similique, non perferendis fugit reprehenderit
				cum debitis? Fuga, adipisci!
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste inventore consectetur aut laudantium
				mollitia sint aliquid nulla asperiores assumenda recusandae similique, non perferendis fugit reprehenderit
				cum debitis? Fuga, adipisci!
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste inventore consectetur aut laudantium
				mollitia sint aliquid nulla asperiores assumenda recusandae similique, non perferendis fugit reprehenderit
				cum debitis? Fuga, adipisci!
			</p>
		</div>
	</div>
</template>

<script>
import SectionTitle from '@/components/global/SectionTitle'

export default {
	name: 'Index',
	scrollToTop: false,
	head() {
		return {
			title: 'My Index title',
		}
	},
	components: {SectionTitle},
}
</script>

<style lang="scss">
</style>
