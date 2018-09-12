// import packages
const express = require('express')
const knex = require('knex')
const knexConfig = require('./knexfile')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// init server and database
const server = express()
const db = knex(knexConfig.development)

server.use(express.json())

// for development
const secret = 'secret'

// generate tokens
const generateToken = (user) => {
  const { username, department } = user
  
  const payload = { username, department }
  const options = {
    expiresIn: '2h',
    jwtid: '246'
  }

  return jwt.sign(payload, secret, options)
}

// register a user 
server.post('/api/register', (req, res) => {
  const user = req.body
  const hashedPassword = bcrypt.hashSync(user.password, 12)
  user.password = hashedPassword
 
  // store user into database
  db('user').insert(user)
    .then(ids => {
      const token = generateToken(user)
      // send client token
      res.status(200).json(token)
    })
    .catch(error => res.status(500).json({ message: error }))
})

// a user login
server.post('/api/login', (req, res) => {
  const user = req.body
  const { username, password } = user

  // check whether username exists
  db('user').where({ username }).first()
    .then(user => {
      // if yes and password matches
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json(token)
      } else {
        res.status(401).json({ message: `You shall not pass!` })
      }
    })
    .catch(error => res.status(500).json({ message: error }))
})

const checkToken = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      // if token is invalid
      if (error) {
        res.status(401).json({ message: `Token is invalid` })
      } else {
        next()
      }
    })
  } else {
    res.status(401).json({ message: `You shall not pass!` })
  }
}

// for accessing database
server.get('/api/users', checkToken, (req, res) => {
  db('user').select()
  .then(users => {
      res.status(200).json(users)
    })
  .catch(error => res.status(500).json({ message: error }))
})

const port = 3300
server.listen(port, () => { console.log(`server is listening on port ${port}`) })