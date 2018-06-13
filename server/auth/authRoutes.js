const router = require('express').Router();

const User = require('../users/User');

const jwt = require('jsonwebtoken');


function generateToken(username) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { username };
  return jwt.sign(payload, 'No word is true until it is eaten.', options);
}

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
