<template>
	<div class="container about">
		<el-row align="middle" :gutter="30">
			<el-col :span="24" class="about__intro">
				<h3>¡Hola! Mi nombre es</h3>
				<h1>Ilán Vivanco.</h1>
				<h2>Soy desarrollador web full stack.</h2>

				<p>
					Actualmente radicado en Santander, España, trabajo en remoto como freelancer para empresas
					internacionales desde hace más de 5 años. Especializado en el armado —y muy ocasionalmente diseño— de
					themes y plugins hechos a medida en WordPress.
				</p>
			</el-col>
		</el-row>

		<el-row :gutter="30" type="flex" class="mb4">
			<el-col :span="15" class="about__info">
				<section-title title="sobre mi" type="h2" />
				<p>
					Nací en Buenos Aires allá por 1988. Estudié comunicación publicitaria y diseño gráfico, para luego
					orientarme por la fotografía. Sin embargo, trabajo desde 2005 en todo lo que es diseño (?) web.
				</p>
				<p>
					Soy autodidacta, proactivo y me encanta trabajar en equipos motivados. Apacionado por el mundo de la
					programación. Aunque comencé mi carrera por el lado artísico, de a poco me fui metiendo en la parte
					lógica, hasta que, ya no pude dar marcha atrás.
				</p>
				<p>
					Algunas personas dicen que soy demasiado perfeccionista, y aunque a veces puede ser algo negativo, a mi
					me gusta serlo. Soy un fiel creedor que las cosas se tienen que hacer bien, o al menos se debería dar lo
					mejor que se pueda para hacerlo.
				</p>
				<p>
					Me encanta aprender, y trato de nunca dejar de hacerlo. Más en este rubro en donde todo cambia 180 grados
					cada 3 ó 4 años. Cada nuevo proyecto es una excusa para encarar alguna nueva tecnología/metodología
					—Siempre tratando de ajustalo, lo mejor posible a cada necesidad—.
				</p>
				<p>
					En los últimos años aprendí también que disfruto enseñar, así que espero pronto poder realizar algún
					proyecto en el cual pueda explorar esto.
				</p>
				<p>
					En mi tiempo libre, me encanta viajar con mi esposa, Gise Haag, y nuestra pequeña hija de 4 años. Amo la
					fotografía y realmente disfruto cada momento de proceso, desde la captura hasta la edición.
				</p>
			</el-col>
			<el-col :span="9" class="about__pictures">
				<section-title title="últimas fotos" type="h2" />

				<feed-instagram :count="10" />
			</el-col>
		</el-row>

		<el-row :gutter="30" type="flex">
			<el-col :span="24" class="about__info">
				<section-title title="cómo llegué hasta acá" type="h2" />

				<p>
					Por ese entonces diseñando y animando sitios con Adobe Flash. Con cada nuevo proyecto fui incorporando
					algo de programación, usando ActionScript 2 y 3, para así poder darle vida a esos sitios estáticos.
					Aunque una vez que conocí el lado del código me enamoré y me fui alejando cada vez más del diseño, hasta
					dejarlo casi por completo.
				</p>
				<p>
					Luego de Flash, quise hacer cosas más avanzadas y comencé a estudiar PHP y MySQL, de la mano de HTML,
					Javascript y CSS, por supuesto. Hasta que finalmente por el 2010, un día me crucé WordPress -no sin antes
					haber intentado con Joomla y algunos otros- y ya me fue difícil alejarme. Desde ese entonces he realizado
					todo tipo de trabajos, desde los más simples y mundanos, hasta proyectos monumentales como migraciones de
					bases de datos externas adaptándolas a WordPress.
				</p>
				<p>
					En el camino también me topé y muchas otras tecnologías -como pueden ser WooCommerce, NodeJS, Laravel,
					etc- las cuales fui tratando de incluir en los proyectos en los cuales fueran necesarias. A día de hoy,
					trato de mantenerme al corriente y no paro aprender cosas nuevas siempre que puedo.
				</p>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import Transitions from '@/mixins/Transitions'
import SectionTitle from '@/components/global/SectionTitle'
import FeedInstagram from '@/components/FeedInstagram'

export default {
	name: 'Index',
	scrollToTop: false,
	head() {
		return {
			title: 'My Index title',
		}
	},
	components: { SectionTitle, FeedInstagram },
	mixins: [Transitions],
}
</script>

<style lang="scss">
.about__intro {
	@extend .mb4;

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
		font-size: 1.1rem;
		font-style: italic;
		line-height: 1.4;
	}
}

.about__info {
	p {
		line-height: 1.4;
	}
}
</style>
