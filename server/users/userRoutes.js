const router = require('express').Router();

const User = require('./User');
const jwt = require('jsonwebtoken');
const secret = 'london paris england france';


function restricted(req, res, next) {
  const token = req.headers.authorization

  if (token) {
    jwt.verification, secret, (err, decoded) => {
      req.jwtPayload = decoded;
      if (err) {
        return res.status(401)
          .json({ message: 'access denied' });
      }
      next();
    }
  } else {
    res.status(401).json({ message: 'your access is denied' });
  }
}

router
  .get('/', restricted, (req, res) => {
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
