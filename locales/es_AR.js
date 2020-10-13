import cvData from './es/cv'

export default {
	greeting: "Hola mundo desde I18N!",
	another: "Más datos desde I18N!",
	taglines: [
		'programador WordPress',
		'programador backend',
		'programador frontend',
		'programador full-stack',
		'líder de proyecto',
		'fotógrafo',
		'padre',
		'geek'
	],
	cv: {
		data: cvData,
		date_format: "DD/MM/YYYY",
		age: "años",
		present: "Presente",
		tooltips: {
			web: "Sitio",
			email: "E-mail",
			phone: "Teléfono",
			age: "Edad",
			location: "Ciudad",
		},
		icons: {
			email: "el-icon-message",
			phone: "el-icon-mobile-phone",
			age: "el-icon-date",
			location: "el-icon-location-information",
			languages: "el-icon-chat-line-round",
			skills: "el-icon-set-up",
			positions: "el-icon-suitcase",
			courses: "el-icon-tickets",
			hobbies: "el-icon-camera",
			studies: "el-icon-reading",
		},
		headers: {
			languages: "Idiomas",
			skills: "Habilidades",
			positions: "Experiencia",
			courses: "Cursos",
			hobbies: "Hobbies",
			studies: "Estudios",
			portfolio: "Trabajos",
		},
		ratings: {
			high: "alto",
			medium: "medio",
			low: "bajo",
		}
	}
}
