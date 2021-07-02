require('dotenv').config()

module.exports = {
	base_url: process.env.BASE_URL,
	instagram: {
		url: process.env.INSTAGRAM_URL,
		dest: process.env.INSTAGRAM_DEST,
	},
}
