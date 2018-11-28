const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('./database/dbConfig.js')

require('dotenv').config()
const secret = process.env.JWT_SECRET

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))

// helper functions and middlewares

function generateToken({ username, department }) {
  const payload = {
    username,
    department
  }

  const options = {
    expiresIn: '1m'
  }

  return jwt.sign(payload, secret, options)
}

function authorize(req, res, next) {
  // token is normally sent in the the Authorization header
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'invalid token' })
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    res.status(401).json({ message: 'not token provided' })
  }
}

// function checkRole(role) {
//   return function(req, res, next) {
//     if (req.decodedToken && req.decodedToken.roles.includes(role)) {
//       next()
//     } else {
//       res.status(403).json({ message: 'you have no access to this resource' })
//     }
//   }
// }

// routes

server.post('/api/register', (req, res) => {
  const creds = req.body

  const hash = bcrypt.hashSync(creds.password, 8) // rounds is 2^X

  creds.password = hash

  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => json(err))
})

server.post('/api/login', (req, res) => {
  const creds = req.body

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({ message: 'welcome!', token })
      } else {
        res.status(401).json({ message: 'you shall not pass!!' })
      }
    })
    .catch(err => res.json(err))
})

server.get('/api/users', authorize, (req, res) => {
  db('users')
    .select('id', 'username', 'password')
    .then(users => {
      res.json(users)
    })
    .catch(err => res.send(err))
})

// // protect this route, only authenticated users should see it
// server.get('/api/me', protected, (req, res) => {
//   db('users')
//     .select('id', 'username', 'password') // ***************************** added password to the select
//     .where({ id: req.session.user })
//     .first()
//     .then(users => {
//       res.json(users)
//     })
//     .catch(err => res.send(err))
// })

server.listen(3300, () => console.log('\nrunning on port 3300\n'))
