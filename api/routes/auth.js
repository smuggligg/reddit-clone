const express = require('express')

const User = require('../models/user')
const { signJwt, verifyJwt } = require('../services/jwt')

const router = express.Router()

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body

  if (username && password) {
    const userData = {
      username,
      password,
      role: username === 'admin' ? 'admin' : 'user'
    }
    return User.count({ username })
      .exec()
      .then(num => {
        if (num > 0) {
          const error = new Error('Duplicate user')
          error.status = 400
          return next(error)
        }
        User.create(userData, (err, user) => {
          if (err) {
            return next(err)
          }
          const token = signJwt(user)
          res.json({
            success: true,
            user,
            token
          })
        })
      })
      .catch(next)
  }

  const error = new Error('All fields required')
  error.status = 400
  return next(error)
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  if (username && password) {
    return User.authenticate(username, password, (error, user) => {
      if (error) {
        return next(error)
      }

      if (!user) {
        const error = new Error('Wrong username or password')
        error.status = 401
        return next(error)
      }
      const token = signJwt(user)
      return res.json({
        success: true,
        token,
        user
      })
    })
  }

  const error = new Error('All fields required')
  error.status = 400
  return next(error)
})

router.get('/', (req, res) => {
  const bearer = req.headers.authorization
  if (!bearer) {
    return res.status(401).send('Missing Auth Header')
  }
  const token = bearer.trim().split(' ')[1]
  verifyJwt(token, (err, user) => {
    if (err) {
      res.status(401).send({ success: false, message: 'Authentication failed' })
    }
    return res.json({ success: true, user })
  })
})

module.exports = router
