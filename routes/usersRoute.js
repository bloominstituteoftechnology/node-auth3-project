require("dotenv").config();
const express = require("express");
const db = require("../data/dbConfig.js");
const route = express.Router();
const jwt = require("jsonwebtoken");

const authorized = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "invalid token" });
      } else {
        req.decodedToken = decodedToken;
      }
      next();
    });
  } else {
    res
      .status(401)
      .json({ message: "Token was not provided with username/password" });
  }
};

route.get("/", authorized, (req, res) => {
  db("users")
    .select("*")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err =>
      res.status(500).json({ message: `There was an error: ${err}` })
    );
});

module.exports = route;
