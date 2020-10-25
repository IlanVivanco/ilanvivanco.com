<template>
	<div class="container about">
		<el-row align="middle" :gutter="30">
			<el-col :span="24" class="about__intro">
				<h3>¡Hola! Mi nombre es</h3>
				<h1>Ilán Vivanco.</h1>
				<h2>Desarrollador web full stack.</h2>

				<p>
					Soy desarrollador web full stack experto en WordPress trabajando en remoto como freelancer para empresas
					internacionales desde Argentina. Especializado en el armado —y muy ocasionalmente diseñando— de sitios
					web hechos a medida en WordPress.
				</p>
			</el-col>
		</el-row>

		<el-row align="middle" :gutter="30" type="flex">
			<el-col :span="12" class="about__data">
				<section-title title="sobre mi" type="h2" />

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, nihil qui sunt at dolorem officia
					sed vitae. Hic ad aspernatur voluptas magni itaque exercitationem sint doloremque consequatur corporis!
					Maiores, dignissimos.
				</p>
			</el-col>
			<el-col :span="12" class="about__data">
				<section-title title="mucho más" type="h2" />

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, nihil qui sunt at dolorem officia
					sed vitae. Hic ad aspernatur voluptas magni itaque exercitationem sint doloremque consequatur corporis!
					Maiores, dignissimos.
				</p>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import SectionTitle from '@/components/global/SectionTitle'

export default {
	name: 'Index',
	scrollToTop: false,
	head() {
		return {
			title: 'My Index title',
		}
	},
	components: { SectionTitle },
	mixins: [Transitions],
}
</script>

<style lang="scss">
.about__intro {
	margin-bottom: 2rem;

	h1 {
		line-height: 1.2;
	}

	h2 {
		color: $color-blue;
		line-height: 1.2;
		font-size: 1.3em;
	}

	h3 {
		color: $color-teal-dark;
		font-weight: normal;
		font-size: 0.9rem;
	}

	p {
		margin-top: 1rem;
		font-style: italic;
		line-height: 1.4;
	}
}
</style>
