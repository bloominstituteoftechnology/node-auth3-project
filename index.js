const express = require('express');
const jwt = require('jsonwebtoken');
const secret = 'secret';
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./data/db');
const server = express();

const generateToken = (user) => {
  const options = {
    expiresIn: "1h"
  }
  const payload = {name: user.username};
  return jwt.sign(payload, secret, options);
};

server.use(express.json());
server.use(cors({origin: 'http://localhost:3000', credentials:true}));

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: 'you shall not pass!! - token invalid' });
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' });
  }
}

server.post('/api/register', (req, res) => {
  // save the user to the database
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  db    
    .insert(user)
    .into('users')
    .then(id => {
      db('User') 
        .then(user => res.status(201).json(user.pop()))
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

server.get('/users', protected, (req, res) => {
  //console.log('token', req.jwtToken);
  db('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.listen(8000, () => {
  console.log('API running on port 8000')
});