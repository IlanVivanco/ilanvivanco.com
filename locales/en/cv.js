import es_cv from '../es/cv.js';
import _ from 'lodash';

const en_cv = _.merge({}, es_cv, {
	date_format: "MM/DD/YYYY",
	age: "years old",
	present: "Present",
	headers: {
		languages: "Languages",
		skills: "Skills",
		positions: "Expererience",
		courses: "Courses",
		hobbies: "Hobbies",
		education: "Education",
		portfolio: "Portfolio",
		tech: "Technologies",
	},
	ratings: {
		high: "alto",
		medium: "medio",
		low: "bajo",
	},
	data: {
		name: "ilán vivanco",
		job_title: "Full Stack Web Developer",
		languages: [
			{ name: "Spanish", level: 7, },
			{ name: "English", level: 6, },
		],
	},
});

export default en_cv
