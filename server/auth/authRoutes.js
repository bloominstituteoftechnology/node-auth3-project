const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');

const secret = 'hasta siempre Comandante';

function generateToken(user) {
  const options = {
    expiresIn: '1h',
  };
  const payload = { name: user.username, race: user.race };

  return jwt.sign(payload, secret, options);
}

router.post('/register', function(req, res) {
  const { username, password } = req.body;
  if (!username || !password || !race) {
    res.status(400).json({ error: "Can't submit empty field!" });
    return;
  }
  User.create(req.body)
    .then(({ username, race}) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToken({ username, race });
      // then we assemble a new object and return it
      res.status(201).json({ username, race, token });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const { username, race, password } = req.body
  User.findOne({ username })
    .then(user => {
      if (user) {
        user.validatePassword(password)
          .then(isPasswordValid => {
            if (isPasswordValid) {
              const { username, race } = user
              const token = generateToken(user)
              res.status(200).json({ message: `welcome ${username}!`, token } )
            } else {
              res.status(401).json({ error: 'Invalid credentials, check your username or password!' })
            }
          })
          .catch(err => {
            res.status(500).json({ error: 'error processing information' })
          })
      } else {
    res.status(401).json({ error: 'Invalid credentials, check your username or password!' })
      }
    })
})

module.exports = router;
