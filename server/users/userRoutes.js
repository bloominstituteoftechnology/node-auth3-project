const router = require('express').Router();
const jwt = require('jsonwebtoken');

const secret = "I am a secret";
const User = require('./User');

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload = decodedToken;
      if (err) {
        return 
        res.status(401)
        res.json({ message: 'you shall not pass! not decoded' });
      }
      next();
    });
  } else {
    res.status(401).json({ message: 'you shall not pass! no token' });
  }
}

router.get('/api/users', restricted, (req, res,) => {
  User
  .find()
  .then(users => {
    res.status(200)
    res.json({ user })
  })
  .catch(err => {
    return res.status(500).json({ message: "error" })
  });
});


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
