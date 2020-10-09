import cvData from './es/cv'

export default {
	greeting: "Hola mundo desde I18N!",
	another: "Más datos desde I18N!",
	taglines: ['programador WordPress', 'programador backend', 'programador frontend', 'programador web', 'fotógrafo', 'padre', 'geek'],
	cv: {
		data: cvData,
		age: "años",
		present: "Presente",
		tooltips: {
			web: "Sitio",
			mail: "E-mail",
			phone: "Teléfono",
			age: "Edad",
			location: "Ciudad",
		},
		headers: {
			experience: "Experiencia",
			languages: "Idiomas",
			skills: "Habilidades",
			experience: "Experiencia",
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
