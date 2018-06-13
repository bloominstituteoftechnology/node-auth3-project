const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');

const secret = 'Not the beard!';

function generateToken(user) {
  const payload = {
    name: user.username,
    race: user.race,
  }
  return jwt.sign(payload, secret);
}

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToke({ username, race })
      // then we assemble a new object and return it
      res.status(201).json({ username, race, token });
    })
    .catch(err => res.status(500).json(err));
});


router.post('/login', (req, res) => {
  const { username, race,  password } = req.body;
  User
      .findOne({ username })
        .then(user => {
          if (user) {
            user.validatePassword(password)
              .then(passwordsMatch => {
                if (passwordsMatch) {
                  const { username, race } = user;

                  const token = generateToken({ username, race });

                  res.status(200).json({ message: `Hello there ${username}`, race, token})

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
