require('dotenv').config()

module.exports = {
	instagram: {
		url: process.env.INSTAGRAM_URL,
		host: process.env.INSTAGRAM_HOST,
		key: process.env.INSTAGRAM_KEY,
		user: process.env.INSTAGRAM_USER,
		dest: process.env.INSTAGRAM_DEST,
	}
}
