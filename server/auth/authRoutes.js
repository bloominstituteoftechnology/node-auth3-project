const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');
const secret = 'braden govi xang chris';

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
});

function generateToken(user) {
  const options = {
    expiresIn: '1hr',
  };
  const payload = {
    name: user.username
  };

  return jwt.sign(payload, secret, options);
}

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User
      .findOne({ username })
        .then(user => {
          if (user) {
            user.validatePassword(password)
              .then(passwordsMatch => {
                if (passwordsMatch) {
                  const token = generateToken(user);

                  res.status(200).json({ message: `Hello there ${username}`}, token)
                } else {
                  res.status(401).send('Invalid credentials.');
                }
              })
              .catch(error => {
                res.send('Invalid credentials.');
              });
          } else {
            res.status(401).send('Invalid credentials.')
          }
        })
        .catch(error => {
          res.send(error);
        })
})

module.exports = router;
