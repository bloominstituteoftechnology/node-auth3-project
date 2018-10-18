const express = require('express');
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');

const { generateToken, protected } = require('../middleware');

const router = express.Router();

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
router.get('/users', protected,  (req, res) => {
  console.log('\n** decoded token information **\n', req.decodedToken);
  db('users')
    .select('id', 'username', 'password', 'department')
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.send(err));
});

module.exports = router;