const router = require('express').Router();

const User = require('./User');

router.get('/', (req, res) => {
  const encodedToken = req.token;
  const decodedToken = req.decodedToken;
  const race = decodedToken._doc.race;
  // const JWT = req.JWT;
  console.log(decodedToken._doc.race);
  User.find()
    .where({ race })
    .select('-password')
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
