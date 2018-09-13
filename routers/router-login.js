const express = require("express");
const bcrypt = require("bcryptjs");
const generateToken = require("../routers-middleware/generateToken.js");
const ls = require("local-storage"); 
const loginRouter = express.Router();

const db = require("../db/dbConfig.js");

loginRouter.post("/", (req, res) => {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token, username: creds.username });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => res.status(500).send(error));
});

module.exports = loginRouter;
