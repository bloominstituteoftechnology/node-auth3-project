const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const secret = 'shhhhh don\'t tell my secret';

function generateToken(user) {
  const payload = {
    userName: user.userName,
    department: user.department
  };

  const options = {
    expiresIn: '1h',
    jwtid: '123abc',
    subject: `${user.id}`
  };

  return jwt.sign(payload, secret, options);
}

const errHandler = (err) => {
  res.status(500).json(err)
};

function protected (req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: 'No authorization - invalid token' })
    }
    else {
      req.userName = decodedToken.userName;
      next();
    }
  })
}

server.get('/', (req, res) => {
  res.send('it\'s alive!');
});

server.post('/api/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('users').insert(creds).then(ids => {
    const id = ids[0];

    db('users').where({ id }).first().then(user => {
      const token = generateToken(user);
      res.status(201).json({ id: user.id, token })
    }).catch(err => {
      res.status(500).json(err)
    });
  }).catch(err => {
    res.status(500).json(err)
  });
});

server.post('/api/login', (req, res) => {
  const creds = req.body;
  db('users').where({ userName: creds.userName }).first().then(user => {
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ token });
    }
    else {
      res.status(401).json({ message: 'You shall not pass!'});
    }
  }).catch(err => {
    res.status(500).json(err)
  });
});

server.get('/api/users', protected, (req, res) => {
  db('users').select('id', 'username').then(users => {
    res.status(200).json(users)
  }).catch(err => {
    res.status(500).json(err)
  })
});

server.listen(8270);
