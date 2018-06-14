const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = 'supercalifrajalistic teddy bears';
const User = require('../users/User');

const generateToken = (user) => {
  const options = {
    expiresIn: '2h'
  };
  const payload = { name: user.username, race: user.race };
  return jwt.sign(payload, secret, options);
}

const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'you shall not pass!'});
      }
      next();
    })
  } else {
    return res.status(401).json({ message: 'you shall not pass!'});
  }
}

router.post('/register', (req, res) => {
  User.create(req.body)
    .then(({ username, race }) => {
      const token = generateToken({ username, race });
      res.status(201).json({ username, token });
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
        .then(matchPass => {
          if (matchPass) {
            const token = generateToken(user);
            res.json({ message: `Welcome ${username}`, token });
          } else {
            res.status(401).json('Invalid credentials. Try Again.');
          }
        })
        .catch(err => res.status(500).json(`Error processing request`));
      }
    })
    .catch(err => res.status(500).json(`Error processing request`));
})

module.exports = router;
