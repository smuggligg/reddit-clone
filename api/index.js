const { start } = require('./app')

const host = process.env.HOST
const port = process.env.PORT
const secret = process.env.JWT_SECRET

start({ host, port, secret })
