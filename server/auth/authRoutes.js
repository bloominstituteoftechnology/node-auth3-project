const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../users/User')

const secret = 'Speak "friend" and enter'

function generateToken(user) {
  const payload = { name: user.username, race: user.race }
  return jwt.sign(payload, secret)
}

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      const token = generateToken({ username, race })
      res.status(201).json({ username, race, token })
    })
    .catch(err => res.status(500).json(err))
})

router.post('/login', (req, res) => {
  const { username, race, password } = req.body
  User.findOne({ username })
    .then( user => {
      if (user) {
        user.validatePassword(password)
          .then( match => {
            if (match) {
              const { username, race } = user
              const token = generateToken({ username, race })
              res.status(200).json({ username, race, token })
            } else {
              res.status(404).json({ error: 'username or password is incorrect' })
            }
          })
          .catch( err => {
            res.status(500).json({ error: 'error processing information' })
          })
      } else {
        res.status(404).json({ error: 'username or password is incorrect' })
      }
    })
})

module.exports = router
