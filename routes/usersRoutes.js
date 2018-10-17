const express = require('express');
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// CUSTOM MIDDLEWARE
function protected(req, res, next) {
  //authentication tokens are normally sent as a header instead of the body
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // token verification failed
        res.status(401).json({ message: 'invalid token'});
      } else {
        // token is valid
        req.decodedToken = decodedToken; // sub-agent middleware of route handler have access to this
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided'});
  }
}

// ROUTES/ENDPOINTS

// Add POST ROUTE HANDLER to register/create a user
router.post('/register', (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Custom Function for token generation
const jwtSecret = 'nobody tosses a dwarf!';
function generateToken(user) {
  const jwtPayload = {
    ...user,
    company: 'MyCorp',
    roles: 'admin',
  };

  const jwtOptions = {
    subject: jwtid,
    expiresIn: '3m',
  }

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
}

// Add POST ROUTE HANDLER to protect GET ROUTE HANDLER to access all users
// so that only authenticated users can see it
router.post('/login', (req, res) => {
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

// Add GET ROUTE HANDLER to access all users
router.get('/users', protected, (req, res) => {
  console.log('\n** decoded token information **\n', req.decodedToken);
  db('users')
    .select('id', 'username', 'password', 'department')
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.send(err));
});

module.exports = router;