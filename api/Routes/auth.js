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
          console.log(newUser)
          const user = newUser[0]
          const token = getToken(user)
          res.status(201).json({ token: token })
        })
        .catch(next)
    })
    .catch(next)
}
// GET USERS
const getUsers = (req, res, next) => {
  db('users')
    .then((response) => {
      const users = response.map((users) => users.username)
      console.log(users)
      res.status(200).json(users)
    })
    .catch(next)
}

// LOGIN
const login = (req, res, next) => {
  const credentials = req.body
  console.log(req.body)
  db('users')
    .where({ username: credentials.username })
    .first()
    .then((user) => {
      if (user || bcrypt.compareSync(credentials.password, user.password)) {
        const token = getToken(user)
        res
          .status(200)
          .json({ mes: 'Logged In', cookie: req.body.username, token })
      } else {
        return res.status(401).json({ error: 'U shall not pass!' })
      }
    })
    .catch(next)
}
// restricted
const restricted = (req, res, next) => {
  const token = req.headers.authorization
  console.log('token,', token)
  if (token) {
    jtw.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: 'you shall not pass!! - token invalid' })
      }
      req.token = decodedToken
      next()
    })
  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' })
  }
}

function departmentUsers (req, res, next) {
  // const department = req.body.department
  db('users')
    .then((response) => {
      const users = response.filter((users) => users.department == 'maywood')
      const filteredUsers = users.map((user) => user.username)
      console.log(users)
      res.status(200).json(filteredUsers)
    })
    .catch(next)
}
// Register
server.post('/register', registerUser)
// GET USERS
server.get('/users', getUsers)
// LOGIN
server.post('/login', login)
// Restricted
server.get('/restricted', restricted, getUsers)
// Get Department
server.get('/departments', restricted, departmentUsers)
module.exports = server
