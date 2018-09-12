const express = require("express");
const bcrypt = require("bcryptjs");
const generateToken = require("../routers-middleware/generateToken.js");
const registerRouter = express.Router();

const db = require("../db/dbConfig.js");

registerRouter.post("/", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);

  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(error => res.status(500).json({error, errorMessage: error.message}));
    })
    .catch(error => res.status(500).json({error, errorMessage: error.message}));
});

module.exports = registerRouter;
