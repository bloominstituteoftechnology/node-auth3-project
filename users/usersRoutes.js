const express = require("express");

const knex = require("knex");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

//JWT Secret
const secret = "shhhhh";

//Function to make a JSON Web Token
function makeToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "1h",
    jwtid: "54321"
  };
  return jwt.sign(payload, secret, options);
}

//Middleware to restrict protected content
function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
}

//Register a new user
router.post("/register", (req, res) => {
  const { username, password, department } = req.body;
  const creds = { username, password, department };
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = makeToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

//Login a registered user
router.post("/login", (req, res) => {
  const { username, department, password } = req.body;
  const creds = { username, department, password };

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = makeToken(user);

        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).send(err));
});

//Get a list of all registered users
router.get("/users", protected, (req, res) => {
  db("users")
    .select("id", "username", "password", "department")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
