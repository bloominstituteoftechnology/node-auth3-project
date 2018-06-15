const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');
const secret = 'Can you keep a secret?';

function genderateToken(user) {

  const options = {
    expiresIn: '1h'
  };

  const payload = { name: user.username, race: user.race };

  return jwt.sign(payload, secret, options);
}

router.post('/register', (req, res) => {
  User.create(req.body)
    .then(({ username, password, race }) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = genderateToken(username, password, race);
      // then we assemble a new object and return it
      res.status(201).json({ username, race, token });
    })
    .catch(error => res.status(500).json(error.message));
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
              const token = genderateToken(user);

              res.status(200).json(`Welcome ${username}!`);
            }
            else {
              res.status(401).send('Invalid credentials.');
            }
          })
          .catch(error => {
            res.status(500).json('An error occurred while validating credentials.');
          })
      }
      else {
        res.status(401).json('Invalid credentials.');
      }
    })
    .catch(error => {
      res.status(500).json('An error occurred while validating credentials.');
    })
});

module.exports = router;
