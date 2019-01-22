const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const server = express();
const userDB = require('./data/helpers/usersModel.js')

const PORT = process.env.PORT || 5400
const secret = 'running-on-unused-time'

server.use(
  express.json()
)

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: '2m',
    jwtid: '789123',

  }
  return jwt.sign(payload, secret, options)
}

function protected() {

}

server.post('/api/register', (req, res ) => {
  const userCreds = req.body;

  const hash = bcrypt.hashSync(userCreds.password, 12);
  userCreds.password = hash;

  userDB.addUser(userCreds)
    .then( ids => {
      const id = ids[0];

      userDB.getUserById(id).then( user => {
        const token = generateToken(user)
        res.status(200).json({user, token})
      })
      .catch( err => {
        res.status(400).json({errMessage: 'unable to get user'})
      })
    })
    .catch( err => {
      res.status(500).json({errMessage: "unable to add user"})
    })
})

server.post('/api/login', (req, res ) => {
  const userCreds = req.body;
  
  if (userCreds.username) {
    userDB.getUserByUsername(userCreds.username)
      .then(user => {
        if(user.length && bcrypt.compareSync(userCreds.password, user[0].password)) {
          const token = generateToken(user)
          res.status(200).json({user, token})
        } else {
          res.status(401).json({errMessage: "invalid username or password"})
        }
      })
      .catch( err => {
        res.status(500).json({errMessage: "invalid username or password"})
    })
  } else {
    res.status(400).json({errMessage: "please insert a username"})
  }
})


server.get('/api/users', (req, res ) => {
  
})

server.listen(PORT, () => {
  console.log(`<=== server is running on port ${PORT} ===>`)
})