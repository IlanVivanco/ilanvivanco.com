const fs = require('fs').promises
const axios = require('axios')
const now = new Date()
const instagramDataFile = 'static/data/instagram.json'
const { INSTAGRAM_URL: instagramURL } = process.env

exports.handler = async function(event, context) {
	try {
		const instaData = await getInstagramData()

		return {
			statusCode: 200,
			body: JSON.stringify(instaData)
		}
	} catch (error) {
		console.error(error)

		return {
			statusCode: 500,
			body: JSON.stringify({ msg: error.message })
		}
	}
}

// Fetch new data only once a day or if force is passed.
async function getInstagramData(force = false) {
	const dayInMillliseconds = 60 * 60 * 24 * 1000
	const lastRun = await fetchLastRun() | 0
	const nextRun = lastRun + dayInMillliseconds
	const shouldFetch = force || now.getTime() > nextRun
	let instaData = undefined

	if (shouldFetch) {
		console.info(`Fetching new data. Latest was from: ${new Date(lastRun)}`)

		try {
			instaData = await fetchData().then(({ data }) => data)
			saveFile(instaData)
		} catch (error) {
			console.error(error)
		}
	} else {
		console.info(`Serving cached data. Next update will be on: ${new Date(nextRun)}`)

		try {
			instaData = await readFile()
		} catch (error) {
			console.error(error)
		}
	}

	return instaData
}

function saveFile({ data }) {
	const instagram = {
		updated_unix: now.getTime(),
		updated_at: now.toLocaleString(),
		data
	}

	fs.writeFile(instagramDataFile, JSON.stringify(instagram))
}

async function readFile() {
	try {
		return await fs.readFile(instagramDataFile).then(JSON.parse)
	} catch (error) {
		console.error(error)
	}
}

async function fetchData() {
	try {
		return await axios({
			method: 'GET',
			url: instagramURL,
			params: {
				limit: 12,
				date: Date.now()
			}
		})
	} catch (error) {
		console.error(error)
	}
}

async function fetchLastRun() {
	try {
		const instagramJSON = await readFile()
		return instagramJSON?.updated_unix
	} catch (error) {
		console.error(error)
	}

	return 0
}
