const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./data/db');

const server = express();
server.use(express.json());
server.use(cors())
const PORT = 8000;

server.get('/', (req, res) => {
  res.send('Sanity Check');
});

server.post('/register', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  db('users').insert(credentials)
   .then(ids => {
     db('users').where('id', ids[0]).first()
       .then(user => {
         const token = generateToken(user);
         res.status(201).json(user);
       });
   })
   .catch(err => {
     res.send(err);
   });
});

const secret = 'bullshit';

const generateToken = (user) => {
  const payload = {username: user.username};
  const options = {
    expiresIn: '1h',
    jwtid: '55555'
  };
  return jwt.sign(payload, secret, options);
}

const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({error: 'GTFO - token invalid'})
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({error: 'GTFO - no token'});
  }
}

server.post('/login', (req, res) => {
  const credentials = req.body;

  db('users').where({username: credentials.username}).first()
    .then((user) => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.send(token);
      } else {
        return res.status(401).json({error: 'Incorrect credentials'});
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.get('/users', protected, (req, res) => {
  console.log('token', req.jwtToken);

  db('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.listen(PORT, () => {
  console.log(`UP and RUNNING on ${PORT}`)
});