const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/userModel');

// this is only going to handle posts for login & register.
router.post('/register', (req, res) => {
  res.send(`register`);
});

router.post('/login', (req, res) => {
  res.send(`login`);
});

module.exports = router;
