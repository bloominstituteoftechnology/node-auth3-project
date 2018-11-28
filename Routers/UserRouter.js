const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../database/dbconfig");

const router = express.Router();

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: "invalid token", err });
      } else {
        req.decodeToken = decodeToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

router.get("/", protected, (req, res) => {
  db("users")
    .select("id", "username", "password")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
