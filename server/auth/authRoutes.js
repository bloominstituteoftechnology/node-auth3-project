const router = require('express').Router();
const cors = require('cors');
const jwt = require('jsonwebtoken')

const secret = "IDun01Fw3C4NEvEnD0TH1ZButTHatz0K1H4V3MYH0M135"
const User = require('../users/User');

function generateToken(username, race) {
  const options = {
    expiresIn: '1h'
  };
  const payload = { name: username, race };
  return jwt.sign(payload, secret, options)
}

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password
      // then we assemble a new object and return it
      const token = generateToken(username, race)
      res.status(201).json({ username, race, token});
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
  .then(user => {
    if (user) {
      user
        .validatePassword(password)
          .then(passwordMatch => {
            if (passwordMatch) {
              const token = generateToken(username, user.race );
              res.status(200).json({ message: `welcome ${username}!`, token })
            } else {
              res.status(401).send('invalid credentials')
            }
          })
          .catch(err => {
            res.send('database error');
          });
        } else {
          res.status(401).send('invalid credentials')
        }
  }).catch(err => {
    res.send(err)
  });
});

module.exports = router;
