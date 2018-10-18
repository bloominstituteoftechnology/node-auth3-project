const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js')

const server = express();

server.use(morgan());
server.use(express.json());
server.use(cors());

const jwtSecret = 'nobody tosses a fucking dwarf';

function protected(req, res, next) {
  console.log('protected firing');
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'You shall not pass!'})
      }
      else {
        req.decodedToken = decodedToken
        next();
      }
    })
  }
  else { res.status(401).json({ message: 'no token provided' }) }
}

function generateToken(user) {
  const jwtPayload = {
    ...user,
    test: 'just some more stuff',
    role: 'student',
    subject: user.id
  }
  const jwtOptions = {
    expiresIn: '90000'
  }

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
}


server.post('/api/register', (req, res) => {
  const user = req.body

  const hash = bcrypt.hashSync(user.password, 14)
  user.password = hash

  db('users')
    .insert(user)
    .then( user => {
      res.status(201).send(user)
    }

    )
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ message: err.message})
    })
})



server.post('/api/login',  (req, res) => {
  const creds = req.body

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)){
        const token = generateToken(user)
        res.status(200).json({ welcome: creds.username, token})
      } else {
        res.status(401).json({ message: 'You shall not pass!' })
        }
      })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ message: err.message})
    })
})



server.get('/api/users', protected, (req, res) => {
  db('users')
    .then(users => {
      res.status(200).send(users)
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ message: err.message})
    })
})



server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  console.log(id);

  db('users')
    .where({ id })
    .del()
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      console.error(err.message);
      res.status(400).send(err.message)
    })
})

const port = 4000
server.listen(port,
  function(){console.log(`\n == Listening on Port:${port} ==`)}
)
