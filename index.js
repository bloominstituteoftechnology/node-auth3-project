/// ---- Node Dependencies ----
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();
const db = require("./data/expressDb.js");

/// ---- Connect Middleware ----
server.use(express.json(), cors(), helmet());

server.get("/", (req, res) => {
  res.send(`HELLO World!`);
});

/// ---- CREATE User Endpoint ----
server.post("/api/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  db("users")
    .insert(user)
    .then(ids => {
      const id = ids[0];
      return res.status(201).json({ newUserId: id });
    })
    .catch(err => res.status(500).json(err));
});

/// ---- Server Port and Listen Method ----
const port = 4400;
server.listen(port, console.log(`\n Server Listening on Port ${port} \n`));
