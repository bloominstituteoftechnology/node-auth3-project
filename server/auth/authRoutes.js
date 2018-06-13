const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');

const secret = 'hasta siempre Comandante';

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username };

  // sign the token
  return jwt.sign(payload, secret, options);
}

router.post('/register', function(req, res) {
  User.create(req.body)
    .then((user) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToken(user);
      // then we assemble a new object and return it
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
