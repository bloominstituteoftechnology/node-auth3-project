const router = require('express').Router();
const secret = "IDun01Fw3C4NEvEnD0TH1ZButTHatz0K1H4V3MYH0M135"
const User = require('./User');
const jwt = require('jsonwebtoken');

function restricted (req, res, next) {
  const token = req.headers.authorization;
console.log('Look at me, being all restricted')
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload = decodedToken;
      console.log('decodedtoken', decodedToken)
      if (err) {
        return res.status(401).json({ message: 'You shall not pass!  Your decoder ring has failed thee!'})
      }
      next();
    })
  } else {
    res.status(401).json({ message: "You shall not pass!  Thou hast no token!"})
  }
}
router.get('/', restricted, (req, res) => {
  User.find()
    .where('race').equals(req.jwtPayload.race)
    .select('-password')
    .then(users => {
      console.log('users', users)
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
