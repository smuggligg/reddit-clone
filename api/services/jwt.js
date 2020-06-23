const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

const verifyJwt = (token, cb) => jwt.verify(token, jwtSecret, cb)

const authJwt = (req, res, next) => {
  const bearer = req.headers.authorization
  if (!bearer) {
    return res.status(400).send('Missing Auth Header')
  }
  const token = bearer.trim().split(' ')[1]
  if (token) {
    verifyJwt(token, (err, decoded) => {
      if (err) {
        res.statusCode = 401
        return next('Authentication failed')
      }
      req.decoded = decoded
      return next()
    })

    return
  }
  res.statusCode = 403
  return next('No token provided')
}

const signJwt = user =>
  jwt.sign(
    {
      userId: user._id,
      username: user.username,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: '1d' },
  )

module.exports = {
  authJwt,
  signJwt,
  verifyJwt,
}
