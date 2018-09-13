"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db/dbConfig.js");
const middlewareFunctions = require("../middleware/middlewareFunctions.js");
// register (add user)
router.post("/register", (req, res, next) => {
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
        .catch(err => {
          err.code = 500;
          next(err);
        });
    });
});
// login
router.post("/login", (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;
  db("users")
    .where({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = middlewareFunctions.generateToken(user);
        res.status(200).json({ token });
      } else {
        try {
          throw new Error();
        } catch (err) {
          err.code = 401;
          next(err);
        }
      }
    })
    .catch(err => {
      err.code = 500;
      next(err);
    });
});
// get users list
router.get("/users", middlewareFunctions.protected, (req, res) => {
  db("users")
    .select("id", "username", "department")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      err.code = 500;
      next(err);
    });
});

module.exports = router;
