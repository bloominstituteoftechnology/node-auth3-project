const router = require('express').Router();

const User = require('./User');

const { verifyToken } = require('../auth/authHelpers');

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  const isTokenValid = verifyToken(token);
  // ***
  if (token && isTokenValid) {
    req.plainToken = isTokenValid;
    next();
  } else {
    res.status(401).json({ "dude": "where's your login?"});
  }
}

router.use('/', checkAuth);

router.get('/', (req, res) => {
  console.log(req.plainToken);
  const { race } = req.plainToken;
  console.log("userRoutes.js race:",race);
  User.find({ race })
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
