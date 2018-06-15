const router = require('express').Router();
const jwt = require('jsonwebtoken')
const User = require('./User');

const secret = "wubba lubba dub dub"

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'you shall not pass! not decoded' });
      }
      req.race = decodedToken.race;
      console.log("in restricted",decodedToken)
      next();
    });
  } else {
    res.status(401).json({ message: 'you shall not pass! no token' });
  }
}

router.get('/',restricted, (req, res) => {  
  
  User.find({race: req.race})
    .select('-password')
    .then(users => {
      console.log(users)
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
