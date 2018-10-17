const express = require('express');
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');

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

// Add GET ROUTE HANDLER to access all users
router.get('/users', (req, res) => {
  db('users')
    .select('id', 'username', 'password')
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.send(err));
});

module.exports = router;