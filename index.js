require("dotenv").config();

const PORT = 3800;
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./database/dbConfig");

const server = express();

const secret = process.env.JWT_SECRET;
// console.log(secret);

server.use(express.json());
server.use(cors());

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ["sales", "marketing", "support"]
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
}

// local middleware

// POST to /api/register
server.post("/api/register", (req, res) => {
  // grab username, password, and department
  const creds = req.body;

  // hash the password
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;

  db("users")
    .insert(creds)
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).json(err));
});
// POST to /api/login

// GET from /api/users

server.listen(PORT, () => console.log(`\n${PORT} is LIVE\n`));
