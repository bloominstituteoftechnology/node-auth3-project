const router = require('express').Router();
//restricted
const User = require('./User');

const get = (req, res) => {
  User.find()
  .select({password:0}) //takes out password from finder
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    res.status(500).json(err);
  });
};

router
  .route("/") // "/api/users/"
  .get(get)

module.exports = router;
