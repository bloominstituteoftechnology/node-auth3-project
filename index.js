const express = require("express")
const helmet = require("helmet")
const logger = require("morgan")
const hash = require("bcryptjs")
const knex = require("knex")
const jwt = require('jsonwebtoken')
const server = express()
const port = process.env.port || 3492
const config = require('./knexfile')
const db = knex(config.development)

server.use(
 helmet(),
 logger('dev'),
 express.json()
)

const gatekeeper = () => {
}

const makeToken = () => {
 const payload = {
  username: user.username
 }
 const secret = 'ollyollyoxenfree'
 const options = {
  expiresIn: '4h',
  jwtid: '090909'
 }
 return jwt.sign(payload, secret, options)
}

server.post('/api/register', (req, res) => {

})

server.post('/api/login', (req, res) => {

})

server.get('/api/users', (req, res) => {

})

server.listen(port, () => {
 console.log(`Server is running live on ${port}`)
})