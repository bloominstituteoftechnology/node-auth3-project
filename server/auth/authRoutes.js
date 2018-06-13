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
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToken({ username, race })
      // then we assemble a new object and return it
      res.status(201).json({ username, race, token })
    })
    .catch(err => res.status(500).json(err))
});

module.exports = router
