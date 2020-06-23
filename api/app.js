const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const auth = require('./routes/auth')
const post = require('./routes/post')
const comment = require('./routes/comment')

const start = ({
  app = express(),
  host = 'localhost',
  port = 3500,
  dbUri = 'mongodb://localhost/27017',
  secret,
}) => {
  mongoose.connect(dbUri)

  const db = mongoose.connection

  db.on(
    'error',
    console.error.bind(console, 'connection error:'),
  )
  db.once('open', () => {
    // connected
  })

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use('/api/auth', auth)
  app.use('/api/posts', post)
  app.use('/api/comments', comment)

  app.use((req, res, next) => {
    const err = new Error('File Not found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res, next) => {
    res
      .status(err.status || 500)
      .json({ message: err.message })
  })

  app.listen(port, () => {
    const boldBlue = text =>
      `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`
    console.info(
      `Server is running at ${boldBlue(
        `http://${host}:${port}/`,
      )}`,
    )
  })

  return app
}

module.exports = { start }
