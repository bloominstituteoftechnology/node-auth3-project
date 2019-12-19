const router = require('express').Router();
const Users = require('./users_model.js');

const restricted = require('../database/restricted_middleware');


router.get('/', restricted, (req, res) => {
  Users.find(req.token.department)
    .then(res => {
      res.status(200).json(res);
    })
    .catch(error => {
      console.log(error);
      res
      .status(400)
      .json({
          error: 'Unable to retrieve a list of users'
        });
    });
});

function checkRole(department) {
    return function(req, res, next) {
      if (req.token && department === req.token.department) {
        next()
      } else {
        res.status(403).json({ message: 'you dont have the power'})
      }
    }
  }

module.exports = router;