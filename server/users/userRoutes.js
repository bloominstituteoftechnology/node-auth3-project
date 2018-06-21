const router = require('express').Router();
const jwt = require('jsonwebtoken')
const User = require('./User');

const secret = 'This is a secret'
function restricted(req, res, next) {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, secret, (err, verifiedToken) => {
     if (err) {
       return res.status(401).json({ message: 'can not enter, not decoded' });
     } 
     next();
    });
  } else {
    res.status(401).json({ message: 'can not enter, no token'});
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
