const express = require("express");
const router = express.Router();

const Users = require("./register-model.js");

router.post("/", (req, res) => {
  if (req.body.username && req.body.password) {
    Users.addUser(req.body).then(ids => {
      res.status(202).json(ids);
    });
  } else {
    res.status(404).json({
      message: "please Provide username and password"
    });
  }
});

module.exports = router;
