const express = require("express")
const helmet = require("helmet")
const logger = require("morgan")
const bcrypt = require("bcryptjs")
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

// const gatekeeper = (req, res, next) => {
//  if (req.session.id){
//   next()
//  }
//  else {
//   res
//    .status(401)
//    .json({message: "Not authenticated."})
//  }
// }

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
 const user = req.body 
 user.password = bcrypt.hashSync(user.password, 16)
})

server.post('/api/login', (req, res) => {
 const user = req.body
 db('users')
   .where('username', user.username)
   .then((users) => {

   })
   .catch(() => {

   })
})

server.get('/api/users', (req, res) => {

})

server.listen(port, () => {
 console.log(`Server is running live on ${port}`)
})