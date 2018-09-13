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
          if(user){
            const token = generateToken(user);
            res.status(201).json({ id: user.id, token });
          } else {
            res.status().json({  })
          }
        
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
});

module.exports = registerRouter;
