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
function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({message: "invalid token"});
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({message: "no token provided"});
  }
}

// POST to /api/register
server.post("/api/register", (req, res) => {
  // grab username, password, and department
  const creds = req.body;

  // hash the password
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  console.log("creds", creds);
  db("users")
    .insert(creds)
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).json(err));
});

// POST to /api/login
server.post("/api/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({username: creds.username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({message: "welcome!", token});
      } else {
        res.status(401).json({access: "denied"});
      }
    })
    .catch(err => res.status(500).json(err));
});

// GET from /api/users
server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("id", "username", "password", "department")
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
});

server.listen(PORT, () => console.log(`\n${PORT} is LIVE\n`));
