require('dotenv').config()
const server = require('express')()
const db = require('../../data/dbConfig')
const bcrypt = require('bcryptjs')
const jtw = require('jsonwebtoken')

function getToken (user) {
  const userId = user.id
  return jtw.sign({ userId }, process.env.SECRET, {
    expiresIn: '1d'
  })
}
// REGISTER
function registerUser (req, res, next) {
  const credentials = req.body
  credentials.password = bcrypt.hashSync(credentials.password, 10)

  db('users')
    .insert(credentials)
    .then((users) => {
      const id = users[0]
      db('users')
        .where('id', id)
        .then((newUser) => {
          const user = newUser[0]
          req.session.username = user.id
          const token = getToken(user)
          res.status(201).json({ token: token })
        })
        .catch(next)
    })
    .catch(next)
}
// GET USERS
const getUsers = (req, res, next) => {
  db('users').then((users) => res.status(200).json(users)).catch(next)
}
// LOGIN
const login = (req, res, next) => {
  const credentials = req.body
  db('users')
    .where({ username: credentials.username })
    .first()
    .then((user) => {
      if (user || bcrypt.compareSync(credentials.password, user.password)) {
        req.session.username = user.id
        const token = getToken(user)
        res
          .status(200)
          .json({ mes: 'Logged In', cookie: req.session.username, token })
      } else {
        return res.status(401).json({ error: 'U shall not pass!' })
      }
    })
    .catch(next)
}
// restricted
const restricted = (req, res, next) => {
  const token = req.headers.authorization
  console.log(token)
  if (token) {
    jtw.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: 'you shall not pass!! - token invalid' })
      }
    })
    req.token = token
    next()
  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' })
  }
}
// Register
server.post('/register', registerUser)
// GET USERS
server.get('/users', getUsers)
// LOGIN
server.post('/login', login)
// Restricted
server.get('/restricted', restricted, getUsers)
module.exports = server
