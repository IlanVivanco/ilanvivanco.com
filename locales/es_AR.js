import cv from './es/cv'

export default {
	greeting: 'Hola mundo desde I18N!',
	another: 'Más datos desde I18N!',
	meta: {
		url: 'https://ilanvivanco.com',
		name: 'Ilán Vivanco',
		title: 'Desarrollador web full stack',
		description:
			'Soy Ilán Vivanco, desarrollador WordPress full stack con más de quince años de experiencia. Me especializo en el armado de themes y plugins hechos a medida.',
		home_title: 'Desarrollador web full stack — Santander, España',
		about_title: 'Más info sobre mí — Ilán Vivanco',
		resume_title: 'Mi CV — Ilán Vivanco',
		contact_title: 'Contactame — Ilán Vivanco',
		blog_title: 'Blog — Ilán Vivanco',
		blog_single_title: 'Blog',
		portfolio_title: 'Mi portfolio — Ilán Vivanco',
		twitter: '@IlanVivanco	',
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
		'geek',
	],
	general: {
		not_found: '¡Nada por aquí!',
		error: '¡Algo salió mal!',
	},
	index: {
		titles: {
			about: 'sobre mí',
			latest_pictures: 'últimas fotos',
			history: 'cómo llegué hasta acá',
		},
		copy: {
			intro: '¡Saludos! Me llamo',
			name: 'Ilán Vivanco',
			position: 'Soy desarrollador web full stack',
			lead: 'Con más de quince años de experiencia en desarrollo y diseño web, me he especializado en trabajar remotamente para empresas internacionales, creando temas y plugins personalizados para WordPress. Desde Santander, España, estoy listo para emprender nuevos desafíos y colaborar contigo. ¡Hagamos algo verdaderamente excepcional!',
			about: [
				'Comencé mi trayectoria inicialmente por el lado artístico, pero la lógica y la programación me atraparon y desde entonces no he mirado atrás. Como autodidacta apasionado, estoy en constante búsqueda de nuevas formas de expandir mis horizontes.',

				'Cada nuevo proyecto me ofrece la oportunidad de explorar y aplicar nuevas tecnologías o metodologías, siempre con el objetivo de satisfacer las necesidades específicas del caso. Mi pasión por el aprendizaje nunca se apaga.',

				'Cuando no estoy sumergido en el mundo del código, disfruto mucho viajando con mi esposa, <a href="https://github.com/gisehaag" target="_blank">Gise Haag</a>, y nuestra adorable hija, Olivia. Nos encanta descubrir nuevos lugares y capturar con nuestra cámara los rincones que nos dejan sin aliento.',

				'Si llegaste hasta acá, y todavía no te aburriste, podés conocer aún más <a href="/sobre-mi">sobre mí</a>.',
			],
		},
	},
	about: {
		titles: {
			more_about_me: 'Más info sobre mí',
		},
		copy: {
			intro: 'Qué hay debajo de esta máscara de unos y ceros...',
			history: [
				'Nací en Buenos Aires en 1988 y, aunque estudié comunicación publicitaria, diseño gráfico y fotografía, la programación web se ha convertido en mi verdadero amor durante los últimos 15 años.',

				'Mis primeras aventuras en diseño y animación de sitios web las realicé con Adobe Flash, jugando con pequeños scripts de ActionScript. Pero, ¿quién podría resistirse al encanto del código? Así que me sumergí en él, aunque siempre manteniendo ciertos "TOCs" de diseñador.',

				'Luego decidí que era el momento de aprender algo más avanzado y me aventuré en PHP, MySQL, HTML, CSS y JavaScript. Allá por 2010, me encontré con WordPress y, desde entonces, hemos sido inseparables. A lo largo de estos años, he trabajado en todo tipo de proyectos, desde la personalización de themes hasta migraciones de bases de datos de gran envergadura.',

				'En el camino también me he cruzado con diversas tecnologías y siempre estoy dispuesto a aprender algo nuevo. De hecho, construí este sitio con Vue.JS, ¡y creo que ha quedado bastante bien!',
			],
		},
	},
	resume: {
		titles: {
			section: 'mi historial',
		},
		copy: {
			lead: 'Especializado en la creación de temas y plugins personalizados para WordPress, he demostrado la capacidad de liderar equipos de trabajo, manteniendo siempre un enfoque centrado en la calidad y la experiencia de usuario.',
		},
	},
	contact_me: {
		titles: {
			section: 'contactame',
			form_success: '¡Mensaje enviado!',
			form_error: '¡Error al enviar tu mensaje!',
		},
		copy: {
			lead: '¿Qué te parece si hacemos algo juntos?',
			intro: 'Podés contactarte conmigo por cualquiera de mis redes sociales o usando este formulario.',
			form_success: 'Gracias por contactarte, en breve me comunicaré contigo.',
			form_error: 'Por favor intentalo nuevamente.',
		},
		form: {
			fields: {
				name: 'Nombre',
				email: 'Email',
				message: 'Mensaje',
				send: 'Enviar',
			},
			placeholders: {
				name: 'Tu nombre va acá...',
				email: 'Acá va tu email...',
				message: 'Y acá ponés cualquier cosa que quieras contarme o preguntarme...',
			},
			messages: {
				name_empty: '¡Sin un nombre, no sé a quién dirigirme!',
				name_short: 'Un poco corto, ¿no te parece?',
				email_empty: 'Si no me ponés tu email, ¿cómo te respondo?',
				email_wrong: '¿Estás seguro que ese es tu correo?',
				message_empty: '¡Si no me escribís nada, no sé qué responderte!',
				message_short: 'Seguro tenés algo más para contarme... ¡Ánimo!',
			},
		},
	},
	portfolio: {
		titles: {
			section: 'portfolio',
			for: 'Realizado para',
		},
		copy: {
			lead: 'Estos son algunos de mis sitios favoritos en los que trabajé.',
		},
	},
	blog: {
		titles: {
			section: 'blog',
		},
		copy: {
			lead: 'Recién estoy empezando, pero esto es lo que tengo para contarte.',
			posted_by: 'Por Ilán Vivanco',
			also_in: 'Read in',
		},
	},
	cv,
}
