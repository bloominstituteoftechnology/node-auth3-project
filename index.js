require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['sales', 'marketing'], // this comes from the database
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '60m', //time changed here before another login attempt is needed
  };

  return jwt.sign(payload, secret, options);
}

server.post('/api/login', (req, res) => {
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

  if (token) { // is valid
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) { // is invalid
        res.status(401).json({ message: 'invalid token' });
      } else { // token is good
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else { //bounced
    res.status(401).json({ message: 'not token provided' });
  }
}

//protect this route! Authenticate users only!
server.get('/api/users', protected, checkRole('sales'), (req, res) => {
  db('users')
    .select('id', 'username', 'password')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

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

function checkRole(role) {
  return function(req, res, next) {
    if (req.decodedToken && req.decodedToken.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: 'you have no access to this resource' });
    }
  };
}

server.post('/api/register', (req, res) => {
  const creds = req.body; //grabbing username and password from body
  const hash = bcrypt.hashSync(creds.password, 4); //generate hash from the user's password
  creds.password = hash; //override the user.password with the hash
    //save the user to the DB
  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => json(err));
});


server.listen(3300, () => console.log('\nrunning on port 3300\n'));
