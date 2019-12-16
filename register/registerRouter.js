const express = require("express");
const router = express.Router();

const Users = require("./register-model.js");
const finduser = require("../login/login-modle");

router.post("/", (req, res) => {
  if (req.body.username && req.body.password) {
    finduser.findUser(req.body).then(user => {
      if (!user) {
        Users.addUser(req.body)
          .then(id => {
            res
              .status(202)
              .json({ id, message: `user Created with id ${id[0]}` });
          })
          .catch(error => {
            res.status(500).json({
              error: "error Getting Data"
            });
          });
      } else {
        res.status(400).json({
          message: "Usernamne already Taken!"
        });
      }
    });
  } else {
    res.status(404).json({
      message: "please Provide username and password"
    });
  }
});

module.exports = router;
