const express = require("express");

const knex = require("knex");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

function makeToken(user) {
  const payload = {
    username: user.username
  };

  const secret = "shhhhh";

  const options = {
    expiresIn: "1h",
    jwtid: "54321"
  };
  return jwt.sign(payload, secret, options);
}

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

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const creds = { username, password };

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

module.exports = router;
