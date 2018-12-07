require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./database/dbconfig.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Server Running');
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['jedi', 'sith', 'bounty hunter']
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1m'
  };
  return jwt.sign(payload, secret, options);
}

function protected(req,res,next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'invalid token' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
}

server.post('/api/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.json(err));
})

server.post('/api/login', (req, res) => {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ welcome: user.username, token });
      } else {
        res.status(401).json({ message: 'you shall not pass!' });
      }
    })
    .catch(err => res.json(err))
});
                            
server.get('/api/users', protected, (req, res) => {
  db('users')
  .select('id','username', 'password', 'department')
  .then(users => {
    res.json(users);
  })
  .catch(err => res.send(err));
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db('users')
  .where({ id: id })
  .del()
  .then(count => {
    res.status(200).json({ count });
  })
  .catch(err => res.status(500).json(err));
})

server.get('/api/currentuser', protected, (req, res) => {
  const { id } = req.params;
  db('users')
    .select('id', 'username', 'password') 
    .where({ id: id })
    .first()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.listen(8000, () => console.log('\nrunning on port 8000\n'));