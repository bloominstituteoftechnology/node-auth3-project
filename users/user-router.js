const router = require("express").Router();

const Users = require("./user-model.js");

const restricted = require("../auth/restricted-middleware.js");
const checkRole = require("../auth/check-role.js");

router.get("/", restricted, checkRole("HR"), (req, res) => {
  Users.find()
    .then(users => {
      res.json({ users, user: req.user });
    })
    .catch(error => res.status(404).json({ message: "something went wrong" }));
});

module.exports = router;
