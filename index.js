require('dotenv').config() //reads from the .env file and places them below //add .env file to gitignore
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mwConfig = require('./data/mwConfig')
const db = require('./data/dbConfig.js')

const PORT = 5200
const server = express()
server.use(express.json())

mwConfig(server)

server.post('/register', (req, res) => {
  const creds = req.body
  const hash = bcrypt.hashSync(creds.password, 14)
  creds.password = hash
  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(() => {
      res.status(500).json({ error: 'Unable to register user.' })
    })
})

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  }

  const secret = process.env.JWT_SECRET

  const options = {
    expiresIn: '10m'
  }
  return jwt.sign(payload, secret, options)
}

server.post('/login', (req, res) => {
  const creds = req.body
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        //login is successful
        //create token
        const token = generateToken(user)
        res
          .status(200)
          .json({ message: `${user.username} is logged in`, token })
      } else {
        res.status(401).json({ message: 'You shall not pass!' })
      }
    })
    .catch(() =>
      res.status(500).json({ message: 'Please try logging in again.' })
    )
})

function protected(req, res, next) {
  //the auth token is normally sent in the Authorization header
  const token = req.headers.authorization
  if (token) {
    next()
  } else {
    res.status(401).json({ message: 'no token provided' })
  }
}

//protect this endpoint so only logged in users can see the data
server.get('/users', protected, (req, res) => {
  //  add : async -----if uncomment the below code
  // const users = await db('users')
  db('users')
    .select('id', 'username', 'password') //<----NEVER EVER SEND THE PASSWORD BACK TO THE CLIENT, THIS IS WHAT NOT TO DO!!!
    .then(users => {
      res.json(users)
    })
    .catch(() => {
      res.status(500).json({ message: 'You shall not pass!' })
    })
})

server.get('/users/:id', protected, (req, res) => {
    //  add : async -----if uncomment the below code
    // const users = await db('users')
    db('users')
    .where({ id: req.params.id })
    .first()
    //   .select('id', 'username', 'password') //<----NEVER EVER SEND THE PASSWORD BACK TO THE CLIENT, THIS IS WHAT NOT TO DO!!!
      .then(users => {
        res.json(users)
      })
      .catch(() => {
        res.status(500).json({ message: 'You shall not pass!' })
      })
  })

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
