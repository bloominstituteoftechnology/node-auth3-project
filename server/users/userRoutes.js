const router = require('express').Router();

const User = require('./User');

const { verifyToken } = require('../auth/authHelpers');

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  const isTokenValid = verifyToken(token);
  // ***
  console.log("req.headers:",req.headers);
  console.log('verifyToken:',verifyToken);
  console.log("token:",token,"isTokenValid:",isTokenValid);
  if (token && isTokenValid) {
    next();
  } else {
    res.status(401).json({ "dude": "where's your login?"});
  }
}

router.use('/', checkAuth);

router.get('/', (req, res) => {
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
