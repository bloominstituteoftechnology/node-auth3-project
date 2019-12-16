const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("./login-modle");

router.post("/", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (req.body && username && password) {
    User.findUser(req.body)
      .then(user => {
        if (!user)
          res.status(400).json({
            message: " Invalid Username or Password"
          });
        else {
          if (bcrypt.compareSync(password, user.password))
            res.status(200).json(user);
          else {
            res.status(400).json({
              message: " Invalid Username or Password"
            });
          }
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "error Getting Data"
        });
      });
  } else {
    res.status(404).json({
      message: "Please Provide Username and Password"
    });
  }
});

module.exports = router;
