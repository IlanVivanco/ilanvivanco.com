const axios = require('axios')
const { createClient } = require('@supabase/supabase-js')
const { INSTAGRAM_URL, SUPABASE_URL, SUPABASE_KEY } = process.env
const now = new Date()
const table = 'options'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

exports.handler = async function (event, context) {
	try {
		const instaData = await getInstagramData()

		return {
			statusCode: 200,
			body: JSON.stringify(instaData),
		}
	} catch (error) {
		console.error(error)

		return {
			statusCode: 500,
			body: JSON.stringify({ msg: error.message }),
		}
	}
}

// Fetch new data only once a day or if force is passed.
async function getInstagramData(force = false) {
	const dayInMillliseconds = 60 * 60 * 24 * 1000
	const lastRun = await fetchLastRun()
	const nextRun = lastRun + dayInMillliseconds
	const shouldFetch = force || now.getTime() > nextRun
	let instaData = undefined

	if (shouldFetch) {
		console.info(`Fetching new data. Latest was from: ${new Date(lastRun)}`)

		try {
			instaData = await fetchData().then(({ data }) => data)

			saveData(instaData)
		} catch (error) {
			console.error(error)
		}
	} else {
		console.info(`Serving cached data. Next update will be on: ${new Date(nextRun)}`)

		try {
			instaData = await readData()
		} catch (error) {
			console.error(error)
		}
	}

	return instaData
}

async function saveData(content) {
	try {
		const { data, error } = await supabase.from(table).upsert(
			[
				{ name: 'instagram_last_run', value: getTimestamps() },
				{ name: 'instagram', value: content },
			],
			{ onConflict: 'name' }
		)

		if (error) throw new Error(error.message)
	} catch (error) {
		console.error(error)
	}
}

function getTimestamps() {
	return {
		updated_unix: now.getTime(),
		updated_at: now.toLocaleString(),
	}
}

async function readData() {
	try {
		const data = await fetchOption('instagram')
		return data || {}
	} catch (error) {
		console.error(error)
	}
}

async function fetchData() {
	try {
		return await axios({
			method: 'GET',
			url: INSTAGRAM_URL,
			params: {
				limit: 12,
				date: Date.now(),
			},
		})
	} catch (error) {
		console.error(error)
	}
}

async function fetchLastRun() {
	try {
		const data = await fetchOption('instagram_last_run')
		return data?.updated_unix || 0
	} catch (error) {
		console.error(error)
	}
}

async function fetchOption(name) {
	if (!name) return null

	try {
		const { data, error } = await supabase.from(table).select('*').eq('name', name)
		if (error) throw new Error(error.message)

		return data?.pop()?.value || null
	} catch (error) {
		console.error(error)
	}
}
