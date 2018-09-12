"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db/dbConfig.js");
const middlewareFunctions = require("../middleware/middlewareFunctions.js");
// register (add user)
router.post("/register", (req, res) => {
  const creds = req.body;
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
          const token = middlewareFunctions.generateToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).send(err));
    });
});
// login
router.post("/login", (req, res) => {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = middlewareFunctions.generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).send(err));
});
// get users list
router.get("/users", middlewareFunctions.protected, (req, res) => {
  db("users")
    .select("id", "username", "password")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
