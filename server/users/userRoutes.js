const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = "return of the Mack";
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

//-----RESTRICTED FUNCTION------
function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      // req.jwtPayload.decodedToken = decodedToken;
      console.log(decodedToken);
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

router.get('/users', restricted, (req, res) => {
  User.find({})
    .select('username')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});


module.exports = router;
