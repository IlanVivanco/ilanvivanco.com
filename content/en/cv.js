import es_cv from '../es/cv.js';
import _ from 'lodash';

const en_cv = _.merge(es_cv, {
	job_title: "Full stack web developer",
	birth_date: "1988/06/17",
	languages: {
		es: { lang: "Spanish", },
		en: { lang: "English", },
	},
	skills: {
		wp_m: { skill: "WordPress migrations", },
	}
});

export default en_cv
