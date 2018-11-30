require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./dbConfig');

const server = express();

server.use(express.json());
server.use(cors());
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = 'process.env.JWT_SECRET';
  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secret, options);
}

server.post('/api/login', (req, res) => {
  // grab username and password from body
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {

        const token = generateToken(user);
        res.status(200).json({ message: 'welcome!', token });
      } else {

        res.status(401).json({ message: 'you shall not pass!!' });
      }
    })
    .catch(err => res.json(err));
});

function protected(req, res, next) {

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

    res.status(401).json({ message: 'not token provided' });
  }
}


server.get('/api/me', protected, (req, res) => {
  db('users')
    .select('id', 'username', 'password')
    .where({ id: req.session.user })
    .first()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.get('/api/users', protected, (req, res) => {
  db('users')
    .select('id', 'username', 'password')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


server.post('/api/register', (req, res) => {
  // grab username and password from body
  const creds = req.body;

  // generate the hash from the user's password
  const hash = bcrypt.hashSync(creds.password, 4); // rounds is 2^X

  // override the user.password with the hash
  creds.password = hash;

  // save the user to the database
  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => json(err));
});

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.listen(3300, () => console.log('\nrunning on port 3300\n'));
