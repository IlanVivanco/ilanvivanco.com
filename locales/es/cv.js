import courses from './courses'
import education from './education'
import hobbies from './hobbies'
import positions from './positions'
import skills from './skills'
import socials from '../general/socials'
import tech from './tech'

export default {
	age: "años",
	present: "Presente",
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
		education: "el-icon-reading",
		tech: "el-icon-copy-document",
	},
	headers: {
		languages: "Idiomas",
		skills: "Habilidades",
		positions: "Experiencia",
		courses: "Cursos",
		hobbies: "Hobbies",
		education: "Educación",
		portfolio: "Trabajos",
		tech: "Tecnologías",
	},
	ratings: {
		high: "alto",
		medium: "medio",
		low: "bajo",
	},
	data: {
		name: "ilán vivanco",
		job_title: "Programador web full stack",
		website: "ilanvivanco.com",
		email: "ilanvivanco@gmail.com",
		phone: "(+34) 623 021 789",
		birth_date: "1988-06-17",
		location: "Santander, España",
		languages: [
			{ name: "Español", level: 7, },
			{ name: "Inglés", level: 6, },
		],
		references: [
			{
				name: "Roni Kripper",
				email: "ronikripper@gmail.com",
				phone: "(+1) 617 717 9656"
			}
		],
		socials,
		positions,
		courses,
		education,
		skills,
		hobbies,
		tech,
	},
}
