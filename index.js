// import express -> express is our backend framework
const express = require('express')

// import cors -> cors enables cross origin resourse sharing
// so that our api will work properly
const cors = require('cors')

// import helmet -> helmet strips out indentifying headers
// which would reveal details of our system to hackerz
const helmet = require('helmet')

// import morgan -> morgan is a logging module that helps
// us my logging things to our console in a nice way
const morgan = require('morgan')

// import bycrypt -> bcrypt is a hasing algorithm that generates
// complicated strings of data from other strings in a one-way
// manner, which makes it great for storing passwords
const bcrypt = require('bcryptjs')

// import jsonwebtoken -> jsonwebtoken is a module that handles
// json web tokens, their creation and their verification
const jwt = require('jsonwebtoken')

// import database config from another file where we set up what
// database file to use and stuff
const db = require('./database/dbConfig.js')

// import dotenv and set it up. this will pull in environment
// variables from our .env file and attacth them to process.env
require('dotenv').config()

// grap secret from process.env
const secret = process.env.JWT_SECRET

// initialize our server by calling express (module we imported)
const server = express()

// set up middleware
// express.json() allows us to use json in our request body
server.use(express.json())
// cors sets up the headers for cross origin resource sharing
server.use(cors())
// helmet protects us from blow to the head
server.use(helmet())
// morgan transcribes the goings on of our app in lovely penmenship
server.use(morgan('dev'))

// helper functions and middlewares
// function that will generate a token
// we pass it user that we grab from the database and then
// descructure username and department out of it here
function generateToken({ username, department }) {
  // set up playload
  const payload = {
    username,
    department
  }

  // set up options
  // expiresIn 1m will expire the token in 1 minute
  const options = {
    expiresIn: '1m'
  }

  // return the result of calling the jwt.sign function
  // by passing it the payload and options we just set
  // up and also the secret we pulled in from environment
  // variables above
  return jwt.sign(payload, secret, options)
}

// this function is a middleware that will authorize
// certain routes by checking to make sure that the user
// in question has a current and valid json web token
function authorize(req, res, next) {
  // token is normally sent in the the Authorization header
  // hence we look for it there
  const token = req.headers.authorization

  // check to see if the token is present
  if (token) {
    // verify token by feeding it to jwt.verify along with
    // secret. jwt.verify will return a callback funtion with
    // two arguments: err and the decoded token
    jwt.verify(token, secret, (err, decodedToken) => {
      // if there's an error we tell the client
      if (err) {
        res.status(401).json({ message: 'invalid token' })
      } else {
        // otherwise we add the decoded token to the request body
        // and call next continuing onto the next middleware
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    // if token is not present say so
    res.status(401).json({ message: 'not token provided' })
  }
}

// this is here to be used later probably for inspiration
// ignore it for now please
// pretend you didn't see it
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
// route to register user
server.post('/api/register', (req, res) => {
  // user/client is espected to pass creds in the body
  const creds = req.body

  // we run bcrypt on the password we've been given running
  // if through the hashing algorithm a whole bunch of times
  const hash = bcrypt.hashSync(creds.password, 8) // rounds is 2^X

  // we then set the password to equal hash
  creds.password = hash

  // now we access the users table in our database
  db('users')
    // and insert a new something with the proper properties:
    // username, password (now our new hashed version), and department
    .insert(creds)
    // then if that' sucessful we return a message to the client
    .then(ids => {
      // the 201 message indicates success
      res.status(201).json(ids)
    })
    // otherwise we return an error
    .catch(err => res.json(err))
})

// set up our login route
server.post('/api/login', (req, res) => {
  // first pull creds out of the req body which the client is expected
  // to have included if they're hitting this route
  const creds = req.body
  console.log(creds)

  // accss the users table in the database
  db('users')
    // select only those records where the username is equal
    // to the username passed in by the client
    .where({ username: creds.username })
    // select only the first one (it should only BE one, we're
    // just doing this to be extra careful)
    .first()
    // then if we're successful
    .then(user => {
      // if the databse returned the user, we check that the stored
      // hash matches a new hash
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        // we then generate a token specific to that user
        // this token will be their key to staying logged in
        const token = generateToken({ ...user })

        // then sent a success message back along with their new token
        res.status(200).json({ message: 'welcome!', token })
      } else {
        // otherwise we tell them they can't pass like gandalf on the
        // bridge of kazadoom. Then we smite the bridge with our staff
        // and they go tumbling into the abyss but oh no their whip
        // catches us by the ankle and we go tumbling along in afterward
        // saving our friends but dooming ourself but then we fight the
        // balrog in the depths and eventually we smite it on the moutainside
        // but we die ourself in the process but then because we're basically
        // a minor deity we come back to the life more powerful and dressed
        // in cleaner, newer robes this time
        res.status(401).json({ message: 'you shall not pass!!' })
      }
    })
    // otherwise we return an error
    .catch(err => res.json(err))
})

// this defines our users route
// it will authorize the user by making sure that they have the
// correct token, then it will return the users from the database
server.get('/api/users', authorize, (req, res) => {
  // grab the deparment rom the decodedToken received from the user
  const { department } = req.decodedToken

  // access users table in databse
  db('users')
    // select the id, username, and password fields
    .select('id', 'username', 'password')
    // select only users that match the department
    .where({ department })
    // we then take those users ..
    .then(users => {
      // and we sent them to the user as a json object
      res.json(users)
    })
    // if we didn't find the users table, most likely because of
    // a database issue, we let them know that too. Aren't we nice?
    .catch(err => res.send(err))
})

// here we start our server and instruct it to listen on port 3300
// like a good little server
server.listen(3300, () => console.log('\nrunning on port 3300\n'))
