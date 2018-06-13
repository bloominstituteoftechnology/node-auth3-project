const router = require('express').Router();

const User = require('./User');

const jwt = require('jsonwebtoken');

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'No word is true until it is eaten.', (err, decodedToken) => {
      req.jwtPayload = decodedToken;
      if (err) {
        return res
          .status(401)
          .json({ message: 'you shall not pass! not decoded' });
      }

      next();
    });
  } else {
    res.status(401).json({ message: 'you shall not pass! no token' });
  }
}


router.get('/', restricted, (req, res) => {
  User.find()
    .where('race').equals(req.jwtPayload.race)
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
