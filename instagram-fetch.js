const ENV = require('./env.js')
const axios = require('axios')
const fs = require('fs')

// Fetching params
const [force] = process.argv.slice(2)

const DAY_IN_MILISECONDS = 60 * 60 * 24 * 1000
const now = new Date()
let lastRun = null
let nextRun = null

// Fetch the last run unix time from prod site
async function fetchLastRun() {
	try {
		const instagramJSON = await axios.request({
			method: 'GET',
			url: `${ENV.base_url}/data/instagram.json`,
		})

		return instagramJSON.data.last_run
	} catch (error) {
		console.error(error)
	}

	return 0
}

// Fetch only once a day or if force is passed
async function maybeFetchInstagramData(force = false) {
	lastRun = await fetchLastRun()
	nextRun = lastRun + DAY_IN_MILISECONDS

	const shouldFetch = force || now.getTime() > nextRun

	// Should we fetch new data or not?
	if (shouldFetch) {
		console.info(`Fetching new data. Latest was from: ${new Date(lastRun)}`)

		try {
			const instaData = await axios({
				method: 'GET',
				url: ENV.instagram.url,
				params: {
					limit: 12,
					date: Date.now(),
				},
			})

			saveTheData(instaData.data)
		} catch (error) {
			console.error(error)
		}
	} else {
		console.info(`Not fetching data. Next update will be on: ${new Date(nextRun)}`)
	}
}

// Save the data to the file
function saveTheData(data) {
	const instagram = {
		last_run: now.getTime(),
		last_run_on: now.toLocaleString(),
		data: data.data,
	}

	fs.writeFileSync(ENV.instagram.dest, JSON.stringify(instagram))
}

maybeFetchInstagramData(force)
