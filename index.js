const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const server = express();
const db = require('./data/dbConfig');
const bcrypt = require('bcryptjs');



server.use(express.json(), cors());

const jwtSecret = 'it\'s a secret';

function generateToken(user) {
    const jwtPayload = {
        ...user,
        hello: 'User',
        roles: ['user', 'admin']
    };
    const jwtOptions = {
        expiresIn: '5m'
    }
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
}

function protected(req, res, next) {
  const token = req.headers.authorization;
  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
    
        if(err) {
            res.status(401).json({ message: 'This user\'s access has been restricted' });
        } else {
            req.decodedToken = decodedToken;
            next();
          }
        })
    } else {
      res.status(401).json({ message: 'not authorized' })
  }
}

function rollCheck(roll) {
    return function(req, res, next) {
        if(req.decodedToken && req.decodedToken.rolls.includes(roll)) {
            next();
        } else {
            res.status(401).json({ message: 'You are not authorized to access this information' });
        }
    };
}

server.get('/api/users', protected, (req, res) => {
    db('users').select('id', 'username', 'password', 'department').then(users => {
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json(err)})
})

server.post('/api/register', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 14);
    req.body.password = hash;

    db('users')
    .insert(req.body)
    .then(userIds => {
        const userId = userIds[0];
        res.status(201).json({ newUser: userId })
    }).catch(err => res.status(500).json(err))
})

server.post('/api/login', (req, res) => {
    db('users')
    .where({ userName: req.body.username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ welcome: user.username, token })
      } else {
          res.status(401).json({ message: 'Unauthorized' })
      }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)})
})






server.listen(3333, () => {
    console.log('\nServer started on port 3333\n');
})