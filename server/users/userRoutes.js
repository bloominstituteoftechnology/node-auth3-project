const router = require('express').Router();

const User = require('./User');

const secret = 'braden govi xang chris';

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload(decodedToken);
      if (err) {
        return res.status(401).json({ message: "Please sign in again." });
      } else {
        req.jwtPayload = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({ error: 'Please log on to access this page (no token)'})
  }
}

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
