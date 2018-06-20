const router = require('express').Router();
const User = require('./User');
const jwt = require('jsonwebtoken')

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      // req.jwtPayload.decodedToken = decodedToken;
      if (err) {
        return res
          .status(401)
          .json({ message: 'you shall not pass! not decoded' });
      }
      req.decodedToken = decodedToken
      next();
    });
  } else {
    res.status(401).json({ message: 'you shall not pass! no token' });
  }
}


router.get('/', restricted, (req, res) => {
  User.find({ race: req.decodedToken.race })
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
