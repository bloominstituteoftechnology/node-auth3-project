const express = require("express");
const router = express.Router();
const restriced = require("./restriced-middleware");
const Users = require("./users-model");

router.get("/", restriced, (req, res) => {
  Users.getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: "error Getting All Users"
      });
    });
});

module.exports = router;
