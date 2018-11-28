const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database/dbconfig");
const jwt = require("jsonwebtoken");

const router = express.Router();

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ["admin", "grunts", "big boss"]
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "10m"
  };
  return jwt.sign(payload, secret, options);
}

router.post("/", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "welcome", token });
      } else {
        res.status(401).json({ message: "not authorized" });
      }
    })
    .catch(err => res.json({ message: "error", err }));
});

module.exports = router;
