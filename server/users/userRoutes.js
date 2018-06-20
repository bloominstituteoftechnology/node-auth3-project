const router = require('express').Router()
const jwt = require('jsonwebtoken')
const secret = 'the quick brown fox jumps over the lazy dog'

const User = require('./User')

function generateToken(username) {
  const options = {
    expiresIn: '1h'
  }
  const payload = { name: username }
  return jwt.sign(payload, secret, options)
}

router.route('/register').post((req, res) => {
  const input = ({ username, password } = req.body)
  console.log(input)
  User.create(input)
    .then(({ user }) => {
      // we destructure the username and race to avoid returning the hashed password
      // then we assemble a new object and return it
      const token = generateToken(user)
      res.status(201).json({ user, token })
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

router.route('/login').post((req, res) => {
  const { username, password } = req.body
  User.findOne({ username })
    .then(user => {
      if (user) {
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if (passwordsMatch) {
              // generate token
              const token = generateToken(user)

              // send token to the client
              res.status(200).json({ message: `welcome ${username}!`, token })
            } else {
              res.status(401).send('invalid credentials')
            }
          })
          .catch(err => {
            res.send({ error: err.message })
          })
      } else {
        res.status(401).send('invalid credentials')
      }
    })
    .catch(err => {
      res.send(err)
    })
})
module.exports = router
