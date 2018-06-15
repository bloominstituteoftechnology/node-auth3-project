const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = 'supercalifrajalistic teddy bears';
const User = require('./User');

const protectedPath = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ err });
      }
      next();
    })
  } else {
    return res.status(401).json({ message:  `You shall not pass` });
  }
}

router.get('/', protectedPath, (req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
