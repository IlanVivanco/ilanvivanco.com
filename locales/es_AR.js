import cv from './es/cv'

export default {
	greeting: 'Hola mundo desde I18N!',
	another: 'Más datos desde I18N!',
	meta: {
		url: 'https://ilanvivanco.com',
		name: 'Ilán Vivanco',
		title: 'Desarrollador web full stack',
		description:
			'Soy Ilán Vivanco, desarrollador WordPress full stack con más de quince años de experiencia. Me especializo en el armado —y muy ocasionalmente, el diseño— de themes y plugins hechos a medida.',
		home_title: 'Desarrollador web full stack',
		resume_title: 'Mi CV',
		contact_title: 'Contactame',
		blog_title: 'Blog',
		blog_single_title: 'Blog',
		portfolio_title: 'Mi portfolio',
		twitter: '@IlanVivanco	'
	},
	taglines: [
		'desarrollador WordPress',
		'programador backend',
		'programador frontend',
		'programador full-stack',
		'líder de proyectos',
		'fotógrafo',
		'papá de Oli',
		'esposo',
		'geek'
	],
	general: {
		not_found: '¡Nada por aquí!',
		error: '¡Algo salió mal!'
	},
	index: {
		titles: {
			about: 'sobre mí',
			latest_pictures: 'últimas fotos',
			history: 'cómo llegué hasta acá'
		},
		copy: {
			intro: '¡Hola! Mi nombre es',
			name: 'Ilán Vivanco',
			position: 'Soy desarrollador web full stack',
			lead:
				'Tengo más de quince años de experiencia; los últimos cinco trabajando en remoto como freelancer para empresas internacionales. Me especializo en el armado —y muy ocasionalmente, el diseño— de themes y plugins hechos a medida para WordPress. Desde hace unos pocos meses, vivo en Santander, España.',
			about: [
				'Soy una persona autodidacta, proactiva y apasionada por el mundo de la programación. Me encanta trabajar en equipos motivados. Si bien mi carrera comenzó por el lado artístico, de a poco, me fui metiendo en la parte lógica, hasta que esta me atrapó y ya no pude dar marcha atrás.',

				'Algunas personas dicen que soy demasiado perfeccionista y, aunque podría considerarse como algo negativo, a mí me gusta serlo. Estoy convencido de que las cosas se tienen que hacer bien, o al menos se debería dar lo mejor para que así suceda.',

				'Me encanta aprender y trato de no dejar de hacerlo nunca. Sobre todo en este rubro, en donde todo cambia 180 grados en relativamente poco tiempo. Cada nuevo proyecto me sirve como excusa para aplicar alguna nueva tecnología o metodología, pero siempre ajustándose a cada necesidad.',

				'Estos últimos años, aprendí que también disfruto mucho enseñando, así que pronto espero realizar algún proyecto en el cual pueda explorar esto.',

				'En mi tiempo libre, me encanta viajar y conocer lugares nuevos junto a mi esposa, Gise Haag, y nuestra pequeña hija de 4 años, Olivia. Amo la fotografía y realmente disfruto de cada momento del proceso, desde la idea y captura, hasta la edición.'
			],
			history: [
				'Nací en Buenos Aires, Argentina, allá por 1988. Estudié comunicación publicitaria y diseño gráfico, para luego orientarme por la fotografía. Sin embargo, desde hace 15 años, trabajo en proyectos relacionados con el diseño y la programación web.',

				'Por aquel entonces diseñaba y animaba sitios con Adobe Flash. Con el tiempo fui incorporando algo de programación, usando ActionScript 2 y 3, para así poder darle vida a esos sitios que en un principio eran muy estáticos. Aunque una vez que conocí el lado del código, me enamoré y me fui alejando cada vez más del diseño, hasta dejarlo casi por completo —siempre quedan algunas manías y TOCs—.',

				'Más tarde, quise aprender cosas más avanzadas y comencé a estudiar PHP y MySQL, de la mano de HTML, CSS, Javascript —principalmente jQuery—. Hasta que finalmente en el 2010, un día me crucé con WordPress, no sin antes haber intentado con Joomla, Prestashop y algunos otros. Desde ese momento, fue difícil alejarme. En todo este tiempo he realizado todo tipo de trabajos, desde los más simples y mundanos, como instalaciones y customizaciones de themes pagos, hasta proyectos de gran envergadura, como migraciones de bases de datos externas, adaptadas a la estructura de WordPress.',

				'En el camino también me topé con otras tecnologías —WooCommerce, NodeJS, Laravel, etc.—, las cuales traté de incluir, en la medida de lo posible. En la actualidad, me mantengo siempre informado y no dejo de aprender cosas nuevas siempre que puedo. Así lo hice para realizar este sitio, que decidí arrancarlo con Vue.JS y creo que no me quedó nada mal.'
			]
		}
	},
	resume: {
		titles: {
			section: 'mi historial'
		},
		copy: {
			lead: 'En todos estos años acumulé experiencia en varios ámbitos que detallo acá abajo.'
		}
	},
	contact_me: {
		titles: {
			section: 'contactame',
			form_success: '¡Mensaje enviado!',
			form_error: '¡Error al enviar tu mensaje!'
		},
		copy: {
			lead: '¿Qué te parece si hacemos algo juntos?',
			intro: 'Podés contactarte conmigo por cualquiera de mis redes sociales o usando este formulario.',
			form_success: 'Gracias por contactarte, en breve me comunicaré contigo.',
			form_error: 'Por favor intentalo nuevamente.'
		},
		form: {
			fields: {
				name: 'Nombre',
				email: 'Email',
				message: 'Mensaje',
				send: 'Enviar'
			},
			placeholders: {
				name: 'Tu nombre va acá...',
				email: 'Acá va tu email...',
				message: 'Y acá ponés cualquier cosa que quieras contarme o preguntarme...'
			},
			messages: {
				name_empty: '¡Sin un nombre, no sé a quién dirigirme!',
				name_short: 'Un poco corto, ¿no te parece?',
				email_empty: 'Si no me ponés tu email, ¿cómo te respondo?',
				email_wrong: '¿Estás seguro que ese es tu correo?',
				message_empty: '¡Si no me escribís nada, no sé qué responderte!',
				message_short: 'Seguro tenés algo más para contarme... ¡Ánimo!'
			}
		}
	},
	portfolio: {
		titles: {
			section: 'portfolio',
			for: 'Realizado para'
		},
		copy: {
			lead: 'Estos son algunos de mis sitios favoritos en los que trabajé.'
		}
	},
	blog: {
		titles: {
			section: 'blog'
		},
		copy: {
			lead: 'Recién estoy empezando, pero esto es lo que tengo para contarte.',
			posted_by: 'Por Ilán Vivanco',
			also_in: 'Read in'
		}
	},
	cv
}
