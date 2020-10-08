import socialsData from './socials'

export default {
	name: "Ilán Vivanco",
	job_title: "Programador web full stack",
	website: "ilanvivanco.com",
	email: "ilanvivanco@gmail.com",
	phone: "(+54) 11.5982.6302",
	birth_date: "17/06/1988",
	location: "Puerto Madryn, Argentina",
	socials: socialsData,
	positions: [
		{
			company: "Delicious Brains",
			name: "Programador web senior",
			excerpt: "Tareas de desarollo de producto para el plugin de	WordPress WP Offload Media Pro/Lite. Atención a	soporte. Actualización de blog posts.",
			from: "2020-04",
			to: "2020-08",
		},
		{
			company: "Networks That Matter",
			name: "Programador web senior y líder de proyectos",
			excerpt: "Coordinación de tareas y manejo de equipo de trabajo. Comunicación con el cliente. Programación de sitios web WordPress. Migración de sitios web a WordPress y realización de themes y plugins hechos a medida.",
			from: "2015-10",
			to: "",
		},
		{
			company: "Explore & Share",
			name: "Programador web senior y líder de proyectos",
			excerpt: "Desarrollo y mantenimiento de explore-share.com Migración del sitio antiguo a WordPress y creación del theme y plugins personalizados.",
			from: "2016-12",
			to: "2018-07",
		},
		{
			company: "Magissim",
			name: "Programador web senior",
			excerpt: "Diseño y programación de sitios web. Desarrollo de sitios web realizados WordPress, Prestashop y Laravel.",
			from: "2014-08",
			to: "2017-02",
		},
		{
			company: "Activar Comunicación",
			name: "Diseñador gráfico y programador web",
			excerpt: "Diseño y programación de sitios web personalizados y administración de sitios web WordPress. Desarrollo de entornos backend a medida en PHP.",
			from: "2013-03",
			to: "2014-06",
		},
		{
			company: "Mendióroz Diseño",
			name: "Diseñador gráfico",
			excerpt: "Diseño y documentación de la señalética para Aeropuertos Argentina 2000 e Inframérica. Armado de renders.",
			from: "2011-03",
			to: "2013-02",
		},
		{
			company: "Exastudio",
			name: "Diseñador gráfico y programador web",
			excerpt: "Diseño y programación desitiospáginas web (Flash, HTML, PHP, AS3). Avisos para diarios y revistas. Imagen corporativa. Fotografía y retoques.",
			from: "2008-04",
			to: "2010-05",
		},
		{
			company: "Trabajos Freelance",
			name: "Programador web y diseñador gráfico",
			excerpt: "Emprendimiento personal para trabajos freelance. Atención de clientes. Desarrollo integral de sitios web. Administración de sitios WordPress. Fotografía y retoques.",
			from: "2005-12",
			to: "",
		},
		{
			company: "Gilardoni & Asoc",
			name: "Ayundate de fotografía y diseñador gráfico",
			excerpt: "Retoques fotográficos. Armado de folletos, logos, packaging, carteles y anuncios publicitarios. Armado de páginas web (PHP, HTML, CSS).",
			from: "2005-06",
			to: "2007-12",
		},
	],
	skills: {
		wp: {
			cat: "WordPress",
			skill: "WordPress",
			level: 7
		},
		wp_t: {
			cat: "WordPress",
			skill: "WP Themes",
			level: 7
		},
		wp_t: {
			cat: "WordPress",
			skill: "WP Plugins",
			level: 6
		},
		wp_m: {
			cat: "WordPress",
			skill: "Migraciones WP",
			level: 7
		},
		wp_w: {
			cat: "WordPress",
			skill: "WooCommerce",
			level: 5
		},
		php: {
			cat: "Languages",
			skill: "PHP",
			level: 7
		},
		mysql: {
			cat: "Languages",
			skill: "MySQL",
			level: 5
		},
		html: {
			cat: "Languages",
			skill: "HTML5",
			level: 7
		},
		css: {
			cat: "Languages",
			skill: "CSS3",
			level: 7
		},
		js: {
			cat: "Languages",
			skill: "JS",
			level: 6
		},
		jquery: {
			cat: "Languages",
			skill: "jQuery",
			level: 6
		},
		vue: {
			cat: "Languages",
			skill: "Vue",
			level: 3
		},
		laravel: {
			cat: "Languages",
			skill: "Laravel",
			level: 3
		},
		node: {
			cat: "Languages",
			skill: "NodeJS",
			level: 4
		},
		bash: {
			cat: "Languages",
			skill: "Bash",
			level: 3
		},
		git: {
			cat: "Extras",
			skill: "Git",
			level: 6
		},
		sass: {
			cat: "Extras",
			skill: "Sass",
			level: 6
		},
		linux: {
			cat: "Extras",
			skill: "Servers",
			level: 4
		},
		ps: {
			cat: "Software",
			skill: "Photoshop",
			level: 7
		},
		ai: {
			cat: "Software",
			skill: "Illustrator",
			level: 7
		},
		id: {
			cat: "Software",
			skill: "InDesign",
			level: 7
		},
	},
	education: {
		gst: {
			from: "2007",
			to: "2009",
			school: "Escuela de Fotografía de Andy Goldstein",
			titles: ["Técnico en fotografía"]
		},
		rag: {
			from: "2001",
			to: "2006",
			school: "Escuelas Técnicas Raggio",
			titles: ["Diseñador gráfico", "Técnico en comunicación publicitaria"]
		},
	},
	languages: {
		es: {
			lang: "Español",
			level: 7,
		},
		en: {
			lang: "Inglés",
			level: 6,
		},
	},
	courses: {
		udm: {
			place: "Udemy",
			from: "2020",
			to: "",
			courses: {
				vue: "VueJS",
			}
		},
		wes: {
			place: "WesBos",
			from: "2020",
			to: "",
			courses: {
				md: "Mastering Markdown",
				flex: "CSS Flexbox",
				grid: "CSS Grid",
				linux: "Command Line",
				es6: "ES6 for everyone",
				js30: "Javascript 30",
			}
		},
		plz: {
			place: "Platzi",
			from: "2015",
			to: "2019",
			courses: {
				github: "Git y Github",
				js: "Javascript ES6",
				wp: "Themes y Plugins WordPress",
				regex: "Expresiones regulares",
				node: "NodeJS",
				bash: "Bash",
				php: "PHP Laravel",
			}
		},
		eit: {
			place: "Educación IT",
			from: "2010",
			to: "2013",
			courses: {
				html: "HTML5 y CSS3",
				resp: "Diseño Responsive",
				php: "PHP y MySQL",
				phpopp: "PHP OOP y MVC",
				ajax: "Ajax y jQuery"
			}
		},
	},
	references: {
		ntm: {
			name: "Roni Kripper",
			email: "ronikripper@gmail.com",
			phone: "(+1) 617 717 9656"
		}
	},
	hobbies: {
		games: {
			name: "Juegos de mesa",
			icon: "/images/cv/hobbies/dice.svg"
		},
		camping: {
			name: "Camping",
			icon: "/images/cv/hobbies/tent.svg"
		},
		pc: {
			name: "Juegos PC",
			icon: "/images/cv/hobbies/joystick.svg"
		},
		photo: {
			name: "Fotografía",
			icon: "/images/cv/hobbies/camera.svg"
		},
		family: {
			name: "Familia",
			icon: "/images/cv/hobbies/family.svg"
		},
		movies: {
			name: "Series y películas",
			icon: "/images/cv/hobbies/tv.svg"
		},
		space: {
			name: "Astronomía",
			icon: "/images/cv/hobbies/telescope.svg"
		},
		music: {
			name: "Música",
			icon: "/images/cv/hobbies/headphones.svg"
		},
		read: {
			name: "Leer",
			icon: "/images/cv/hobbies/reading.svg"
		},
		culture: {
			name: "Cultura",
			icon: "/images/cv/hobbies/globe.svg"
		},
		travel: {
			name: "Viajar",
			icon: "/images/cv/hobbies/plane.svg"
		},
	},
}
