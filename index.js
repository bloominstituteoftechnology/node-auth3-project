require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database/dbConfig.js');
const server = express();

server.use(express.json());
server.use(cors());

// ======== SERVER RUNNING ======== //
server.get('/', (req, res) => {
  res.send('<h1>Its Alive!<h1>');
});


// ========= CREATES USER ========= //
server.post('/api/register', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;

  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      const token = generateToken({ username: credentials.username });
      res.status(201).json({ 
        newUserId: id, 
        token, 
        message: `Welcome to the database, ${credentials.username}` });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});



const jwtSecret = process.env.JWT_SECRET || 'add a secret to your .env file with this key';
// ======= GENERATES TOKEN ======= //
function generateToken(user) {
  const jwtPayload = {
    ...user,
    hello: 'FSW13',
    roles: ['admin', 'root'],
  };
  const jwtOptions = {
    expiresIn: '1h',
  };

  console.log('token from process.env', jwtSecret);
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}


// ========== LOGIN ========= //
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
    .catch(err => {
      res.status(500).json({ err });
    });
});


// AUTHENTICATED USERS SHOULD GET USER-LIST //
server.get('/api/users', protected, checkRole('admin'), (req, res) => {
  db('users')
    .select('id', 'username', 'password', 'department')
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.send(err));
});


// === VERIFICATION for PROTECTION === //
function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // token verification failed
        res.status(401).json({ message: 'invalid token' });
      } else {
        // token is valid
        req.decodedToken = decodedToken;
        console.log('\n** DECODED TOKEN INFO **\n', req.decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
}

function checkRole(role) {
  return function(req, res, next) {
    if (req.decodedToken && req.decodedToken.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: 'you shall not pass! forbidden' });
    }
  };
}


// ========= SERVER ========= //
const port = process.env.PORT || 3300;
server.listen(port, function() {
    console.log(`\n API RUNNING ON PORT ${port} \n`);
  });
