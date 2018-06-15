const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./User');

const secret = "toss me, but don't tell the elf!";

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'YOU SHALL NOT PASS! -(Token Not Decoded)' });
      }
      next();
    });
  } else {
    res.status(401).json({ message: 'YOU SHALL NOT PASS! -(There is No Token)' });
  }
};

router.get('/', restricted, (req, res) => {
  User.find({})
    .select('-password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});


module.exports = router;
