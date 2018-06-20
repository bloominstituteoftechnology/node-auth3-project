const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');
const secret = "Don't ask permission to think for yourself.";

function createToken(user) {
  const options = {
    expiresIn: '1h';
  };
  const payload = { name: user.username };

  return jwt.sign(payload, secret, options);
}

router.post('/register', (req, res) => {
  const { username, race, password } = req.body;

  User.findOne({ username })
    .then(user => {
      if (user) {
        res.status(400).json('Username already exists.');
        return;
      }
      else {
        User.create({ username, race, password })
          .then(({ username, race, password }) => {
            res.status(201).json({ username, race });
          })
          .catch(err => res.status(500).json(err.message))
      }
    })
    .catch(err => res.status(500).json(err.message))
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(user => {
      if (user) {
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if (passwordsMatch) {
              const token = createToken(user);
              res.status(200).json(token);
            }
            else {
              res.status(401).send('Unauthorized.');
            }
          })
          .catch(err => {
            res.status(500).json('Error validating credentials.');
          })
      }
      else {
        res.status(401).json('Invalid credentials.');
      }
    })
    .catch(err => {
      res.status(500).json('Error validating credentials.');
    })
});

module.exports = router;
