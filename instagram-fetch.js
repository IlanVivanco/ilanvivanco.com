const ENV = require('./env.js')
const axios = require('axios')
const fs = require('fs')

// Fetch only once a day or if force is passed
async function fetchInstagramData() {
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
}

// Save the data to the file
function saveTheData({data}) {
	const now = new Date()
	const instagram = {
		updated_at: now.toLocaleString(),
		data,
	}

	fs.writeFileSync(ENV.instagram.dest, JSON.stringify(instagram))
	console.info(`Instagram data saved on ${now.toLocaleString()}.`)
}

fetchInstagramData()
