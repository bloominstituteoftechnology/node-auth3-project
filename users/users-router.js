const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkDepartment('engineering'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function checkDepartment(department) {
  console.log(department)
  return function(req, res, next) {
    console.log(req.decodedToken)

    if (
      req.decodedToken
      && req.decodedToken.departments.includes(department)
    ) {
      next();
    } else {
      res.status(403).json({ message: "can't touch this!" });
    }
  };
}

// const scopes = 'student:read;student:write;student:delete;salary:read'

module.exports = router;
