const router = require('express').Router();
const User = require('./User');
const jwt = require('jsonwebtoken');
const secret = 'I am an anarchist.';

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (error, decodeURIComponent) => {
      if (error) {
        res.status(401).json('You cannot view users without a valid token.');
        return;
      }
      next();
    });
  }
  else {
    res.status(401).json('You cannot view users with a valid token.');
  }
}

router.get('/', restricted, (req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

module.exports = router;