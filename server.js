require('dotenv').config()
const db = require('knex')(require('./knexfile').development)
const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcrypt')

const server = express()
server.use(express.json())

server.post('/signup', async (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password) {
    res
      .status(400)
      .send('please provide username and password')
  }
  try {
    const hash = await bcrypt.hash(req.body.password, 10) 
    const userDetails = {
      username: req.body.username,
      password: hash
    }
    const ids = await db('users').insert(userDetails)
    const user = await db('users')
      .where('id', '=', ids[0])
      .first()
    res.status(200).json(generateUserToken(user))
  } catch (err) {
    next(err) 
  }
})

server.post('/login', async (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password) {
    res
      .status(400)
      .send('please provide username and password')
  }
  try {
    const user = await db('users')
      .where('username', '=', req.body.username) 
      .first()
    const success = await bcrypt.compare(
      req.body.password, 
      user.password
    )
    success 
      ? res.status(200).json(generateUserToken(user))
      : res.status(401).send('invalid credentials')
  } catch (err) {
    next(err)
  }
})

server.get('/users', protected, async (req, res, next) => {
  try {
    const users = await db('users')
      .select('id', 'username', 'department')
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})



server.use((err, req, res, next) => {
  res
    .status(500)
    .json(err)
})

async function protected (req, res, next) {
  const { authorization: token } = req.headers

  try {
    if (token) {
      const decodedToken = await jwt.verify(token, process.env.AUTH_SECRET)
      req.jwtToken = decodedToken
      next()
    } else {
      res.status(401).send('please provide a token')
    }
  } catch (err) {
    res.status(401).json(err)
  }
}

function generateUserToken (user) {
  const payload = {
    username: user.username,
  }
  const options = {
    expiresIn: '1h',
    jwtid: '1'
  }
  return jwt.sign(payload, process.env.AUTH_SECRET, options)
}

server.listen(2345, () => console.log('... 2345 ...'))

