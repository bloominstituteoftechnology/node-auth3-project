const express = require("express");
const cores = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db/dbConfig.js");

const server = express();
const PORT = 4000;

server.use(express.json());

server.get("/", (req, res) => {
  res.status(201).send("Working");
});
// generate token function
const generateToken = user => {
  const payload = {
    username: user.username,
  };
  const secret = "rosebud";
  const options = {
    expiresIn: "1h",
    jwtid: "12345",
  };
  return jwt.sign(payload, secret, options);
};
// protected middleware
const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // wrong token
        res.status(401).json({ message: "Invalid Token" });
      } else {
        // good token
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Missing Token" });
  }
};
// end middleware

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
