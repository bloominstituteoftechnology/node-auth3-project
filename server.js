const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsersModel = require("./users-model");
const secret = require("./secret");

const server = express();

server.use(express.json());

// =============== TEST ===============
server.get("/", (req, res) => {
  res.send("Hello from GET /");
});

// =============== REGISTER ===============
server.post("/api/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  if (!user.username || !user.password) {
    res.status(400).json({ message: "Please provide username and password. " });
  } else {
    UsersModel.add(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "There was an error registering the user." });
      });
  }
});

// =============== LOGIN ===============
server.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  UsersModel.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwt(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "There was an error logging in." });
    });
});

// =============== GET USERS ===============
server.get("/api/users", restricted, (req, res) => {
  UsersModel.find()
    .then(user => {
      res.status(200).json({ loggedInUser: req.user.username, user });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error getting the users." });
    });
});

// =============== JWT ===============
function getJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    jwtid: 1
  };
  const options = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

// =============== RESTRICTED MIDDLEWARE ===============
function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You shall not pass!" });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Token doesn't exist." });
  }
}

module.exports = server;
