const ENV = require('./env.js')
const axios = require('axios')
const fs = require('fs')

// Fetch last run from prod site
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

	// If nothing's found let's fetch it
	return 0
}

// Should we fetch new data or not?
async function shouldFetchData() {
	const DAY_IN_SECONDS = 60 * 60 * 24 * 1000
	const lastRun = await fetchLastRun()
	const nextRun = lastRun + DAY_IN_SECONDS
	const now = new Date().getTime()

	console.log(`Data fetched on: ${new Date(lastRun)}`)

	return nextRun < now
}

// Maybe fetch new data
async function maybeFetchInstagramData() {
	const shouldFetch = await shouldFetchData()

	// Fetch only once a day
	if (!shouldFetch) {
		console.log('Instagram data is up-to-date.')
		return
	}

	console.log('Fetching new instagram data...')

	try {
		const instaData = await axios({
			method: 'GET',
			url: `${ENV.instagram.url}?date=${Date.now()}`,
			params: {
				limit: 12,
			},
		})

		saveTheData(instaData.data)
	} catch (error) {
		console.error(error)
	}
}

function saveTheData(data) {
	const instagram = {
		last_run: new Date().getTime(),
		data: data.data,
	}

	fs.writeFileSync(ENV.instagram.dest, JSON.stringify(instagram))
}

maybeFetchInstagramData()
