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
	// const DAY_IN_MILISECONDS = 60 * 60 * 24 * 1000
	const DAY_IN_MILISECONDS = 1000 * 1000
	const lastRun = await fetchLastRun()
	const nextRun = lastRun + DAY_IN_MILISECONDS
	const now = new Date().getTime()
	const shouldFetch = now > nextRun

	if (shouldFetch) {
		console.log(`Fetching new data. Latest was from: ${new Date(lastRun)}`)
	} else {
		console.log(`Not fetching data. Next time will run on: ${new Date(nextRun)}`)
	}

	return shouldFetch
}

// Maybe fetch new data
async function maybeFetchInstagramData() {
	const shouldFetch = await shouldFetchData()

	// Fetch only once a day
	if (shouldFetch) {
		try {
			const options = {
				method: 'GET',
				url: ENV.instagram.url,
				params: {
					limit: 12,
					date: Date.now(),
				},
			}

			const instaData = await axios(options)

			saveTheData(instaData.data)
		} catch (error) {
			console.error(error)
		}
	}
}

function saveTheData(data) {
	const instagram = {
		last_run: new Date().getTime(),
		last_run_formatted: new Date(),
		data: data.data,
	}

	fs.writeFileSync(ENV.instagram.dest, JSON.stringify(instagram))
}

maybeFetchInstagramData()
