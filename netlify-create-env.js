const fs = require('fs')
fs.writeFileSync('./.env', `rapid_key=${process.env.RAPID_KEY}\n`)
