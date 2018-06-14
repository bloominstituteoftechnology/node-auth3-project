const router = require('express').Router();
const User = require('./User');
const jwt = require('jsonwebtoken');
const secret = 'toss me, but dont tell the elf'

const restricted = (req, res, next) => {
  // get token from header
  const token = req.headers.authorization;
  if (token) {
    //verify token
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'You shall not pass!' })
      }
      next();
    })
  }
  else {
    res.status(401).json({ message: 'You shall not pass!' })
  }
}

router.get('/', restricted, (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
