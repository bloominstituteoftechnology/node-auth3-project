const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, withDepartment("staff"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function withDepartment(department) {
  return function(req, res, next) {
    if (
      req.decodedJwt &&
      req.decodedJwt.department &&
      req.decodedJwt.department.includes(department)
    ) {
      next();
    } else {
      res.status(403).json({ message: "you have no power here" });
    }
  };
}

module.exports = router;
