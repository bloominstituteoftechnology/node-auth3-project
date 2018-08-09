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
    res.status(200).json(user)
  } catch (err) {
    next(err) 
  }
})

server.use((err, req, res, next) => {
  res
    .status(500)
    .json(err)
})

server.listen(2345, () => console.log('... 2345 ...'))

