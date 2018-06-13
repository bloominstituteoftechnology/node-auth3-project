const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./User');

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

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if(token){
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload(decodedToken);
      if(err){
        return res.status(401).json({ message: "You shall not pass! Token not decoded" });
      }
        next();
    });
  } else {
    res.status(401).json({ message: "You shall not pass! No token!" })
  }
}

module.exports = router;
