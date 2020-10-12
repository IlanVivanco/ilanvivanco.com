import cvData from './en/cv'

export default {
	greeting: "Hello world from I18N!",
	another: "More data from I18N!",
	taglines: ['WordPress developer', 'backend developer', 'frontend developer', 'web developer', 'photographer', 'father', 'geek'],
	cv: {
		data: cvData,
		date_format: "MM/DD/YYYY",
		age: "years old",
		present: "Present",
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
