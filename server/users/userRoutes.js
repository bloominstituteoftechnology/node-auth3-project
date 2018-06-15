const router = require('express').Router();
const User = require('./User');
const jwt = require('jsonwebtoken'); 
const secret = 'Can you keep a secret?';

function restricted(req, res, next) {

  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (error, decodeURIComponent) => {
      if (error) {
        res.status(401).json('You cannot view all of ours user without a valid token.');
        return;
      }

      next();
    });
  }
  else {
    res.status(401).json('You cannot view all of our users without a valid token.');
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
    });
});

module.exports = router;
