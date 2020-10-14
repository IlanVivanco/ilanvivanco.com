import courses from './courses'
import education from './education'
import hobbies from './hobbies'
import positions from './positions'
import skills from './skills'
import socials from '../general/socials'
import stack from './stack'

export default {
	lang: "ES",
	name: "ilán vivanco",
	job_title: "Programador web full stack",
	website: "ilanvivanco.com",
	email: "ilanvivanco@gmail.com",
	phone: "(+54) 11.5982.6302",
	birth_date: "1988-06-17",
	location: "Puerto Madryn, Argentina",
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
	stack,
}
