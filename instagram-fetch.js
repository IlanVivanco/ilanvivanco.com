const ENV = require('./env.js');
const axios = require('axios');
const fs = require('fs')

const options = {
	method: 'GET',
	url: ENV.instagram.url,
	params: { username: ENV.instagram.user },
	headers: {
		'x-rapidapi-key': ENV.instagram.key,
		'x-rapidapi-host': ENV.instagram.host
	}
};

const DAY_IN_SECONDS = 60 * 60 * 24 * 1000;
const instagramJSON = fs.readFileSync(ENV.instagram.dest, { encoding: 'utf8', flag: 'r' });
const currentData = JSON.parse(instagramJSON);
const nextRun = (currentData.last_run) ? currentData.last_run + DAY_IN_SECONDS : 0;
const now = new Date().getTime();

// Only fetch new data once a day maximum
if (now < nextRun) return;

// Fetch Instagram data
axios.request(options).then((response) => {
	const instagram = {
		last_run: new Date().getTime(),
		data: response.data,
	};

	fs.writeFileSync(ENV.instagram.dest, JSON.stringify(instagram))
}).catch((error) => {
	console.error(error);
});
