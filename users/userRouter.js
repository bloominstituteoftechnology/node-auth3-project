const router = require('express').Router();

const Users = require('../users/userModel');

// this is only going to handle gets for users and logout
router.get('/', (req, res) => {
  res.send(`users`);
});

router.get('/logout', (req, res) => {
  res.send(`logout`);
});

module.exports = router;
