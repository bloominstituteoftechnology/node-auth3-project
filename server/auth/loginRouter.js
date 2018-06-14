const router = require('express').Router();
const helpers = require('../tools/helperFunctions');

const User = require('../users/User');

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username }, function(err, user) {
    const { username, race } = user;
    user
      .validatePassword(password)
      .then(matched => {
        if (!matched) return res.status(422).json('Bad credentials, please review you credentials and try again.');
        const jwt = helpers.generateToken(user);
        res.status(200).json({ matched, username, race, jwt });
      })
      .catch(e => {
        console.log('error', e);
      });
  });
});

module.exports = router;
