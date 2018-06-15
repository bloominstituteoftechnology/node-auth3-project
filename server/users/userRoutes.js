const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./User');
const { secret } = require('../secret.json');

router.get('/', (req, res) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err)
        return res.status(500).json(err);

      User.find()
        .select('-password')
        .then(users => {
          res.json(users);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    });
  }
  
});

module.exports = router;
