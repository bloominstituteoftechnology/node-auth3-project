const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const User = require("./login-modle");

const router = express.Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (req.body && username && password) {
    User.findUser(req.body)
      .then(user => {
        if (!user)
          res.status(400).json({
            message: " Invalid Username or Password"
          });
        else {
          if (bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ user, token });
          } else {
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

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "30s"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
