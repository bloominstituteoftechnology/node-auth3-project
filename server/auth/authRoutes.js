const router = require('express').Router();
const helpers = require('./helperFunctions');

const User = require('../users/User');

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, password, race }) => {
      // we destructure the username and race to avoid returning the hashed password
      const jwt = helpers.generateToken({ username, race });
      // then we assemble a new object and return it
      res.status(201).json({ username, race, jwt });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
