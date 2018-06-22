const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./User');
const secret = 'Secret makes a woman woman...'

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if(token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      req.jwtPayload = decodedToken
      console.log('decodedToken', decodedToken);
      if(error) {
        return res.status(401).json({ message: 'You shall NOT pass! Not Decoded'})
      }
      next();
    })
  } else {
    res.status(401).json({ message: 'You shall NOT pass! No Token'})
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
