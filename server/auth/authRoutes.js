const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');

const generateToken = (user) => {
  const options = {
    expiresIn: "1h"
  }
  const payload = {name: user.username};
  return jwt.sign(payload, secret, options);
};

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(user => {
      if (user) {
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if (passwordsMatch) {
              const token = generateToken(users);
              res.status(200).json({
                message: `welcome ${username}!`, token
              })
            } else {
              res.status(401).send('invalid credentials')
            }
          })
          .catch(err => res.send('error comparing passwords'));
      } else {
        res.status(401).send('invalid credentials');
      }
    })
    .catch(err => res.send(err));
});

module.exports = router;
