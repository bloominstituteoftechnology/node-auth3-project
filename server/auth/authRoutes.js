const router = require('express').Router()
const jwt = require('jsonwebtoken')
const secret = 'the quick brown fox jumps over the lazy dog'

const User = require('../users/User')

function generateToken(username) {
  const options = {
    expiresIn: '1h'
  }
  const payload = { name: username }
  return jwt.sign(payload, secret, options)
}

router.route('/').get(restricted, (req, res) => {
  User.find({})
    // .select('use')
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

function restricted(req, res, next) {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'you shall not pass! not decoded' })
      }
      next()
    })
  } else {
    res.status(401).json({ message: 'you shall not pass! no token' })
  }
}

module.exports = router
