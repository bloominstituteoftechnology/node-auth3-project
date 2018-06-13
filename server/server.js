const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const jwt = require('jsonwebtoken'); 

const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');
const User = require('./users/User');

const server = express();
const secret = "toss me, but don't tell the elf!";

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
}; 

server.use(cors(corsOptions)); 
setupMiddleware(server);
setupRoutes(server);

server.post('api/register', (req, res) => {
  User.create(req.body)
    .then(user => {
      const token = generateToken(user); 

      res.status(201).json({ username: user.username, token });
    })
    .catch(err => res.status(500).json(err)); 
}); 

server.post('/api/login', (req, res) => {
  const { username, password } = req.body; 
  User.findOne({ username })
    .then(user => {
      if(user) {
        user
          .validatePassword(password)
          .then(passwordMatch => {
            if(passwordMatch) {
              const token = generateToken(user); 
              res.status(200).json({ message: `welcome ${username}!`, token});
            } else {
              res.status(401).send('invalid credentials');
            }
          })
          .catch(err => {
            res.send('error comparing passwords');
          });
      } else {
        res.status(401).send('invalid credentials');
      }
    })
    .catch(err => {
      res.send(err); 
    });
}); 

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username };
  return jwt.sign(payload, secret, options);
}



db.connectTo('authii')
  .then(() => {
    console.log('\n... API Connected to authii Database ...\n');
    server.listen(5500, () =>
      console.log('\n=== API running on port 5500 ===\n')
    );
  })
  .catch(err => {
    console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
  });
