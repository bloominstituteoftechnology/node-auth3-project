const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

router.get('/users', (req, res, next) => {
  db('users')
    .then(users => res.json(users))
    .catch(err => res.send(err));
});

module.exports = router;
