const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("knex");

const dbConfig = require("./knexfile.js");

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());

const secret = "turn about is fair play";

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expireIn: "1h",
    jwtid: "12345"
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No Token provided" });
  }
}

server.get('/', (req, res) => {
    res.send('Its Alive');
});

server.listen(2100, () => console.log("\nrunning on port 3300\n"));
