const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const knexConfig = require("../knexfile");

const server = express();

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

//middleware

function generateToken(user) {
  const payload = { username: user.username };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "10m"
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, err => {
      if (err) {
        res.status(401).send("invalid token");
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token" });
  }
}

// endpoints

server.post("/api/register", (req, res) => {
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 14);
  userInfo.password = hash;

  db("users")
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ err }));
});

server.post("/api/login", (req, res) => {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ login: "failed" });
      }
    })
    .catch(() => res.status(500).send("cannot reach the server."));
});

server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("username", "department", 'password')
    .then(users => {
      res.json(users);
    })
    .catch(() => res.status(500).send("not logged in"));
});

module.exports = server;
