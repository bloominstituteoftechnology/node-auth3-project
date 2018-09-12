const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/index.js');

const server = express();

server.use(express.json());
server.use(cors());

const secret = 'secret';

function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: '1h',
    jwtid: '1234'
  }

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next){
  const token = req.headers.authorization;
  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ message: 'Invalid token.' });
      } else {
        req.user = { username: decodedToken.username, department: decodedToken.department }
        next();
      }
    })
  } else {
    res.status(401).json({ message: 'You shall not pass!' });
  }
}

server.post('/api/register', async (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  try {
    const ids = await db('users').insert(creds)
    const id = ids[0];
    const user = await db('users').where({ id }).first()
    const token = generateToken(user);
    res.status(201).json({id: user.id, token})
  } catch(err) {
    res.status(500).json(err);
  }
})

server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({username: creds.username}).first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'You shall not pass.' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

server.get('/api/users', protected, (req, res) => {
  db('users')
    .select('id', 'username', 'department')
    .where({department: req.user.department})
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.listen(9000, () => console.log('==== Running on port 9000 ===='));
