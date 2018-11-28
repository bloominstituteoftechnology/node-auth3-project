require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
};

// POST - register

server.post("/api/register", (req, res) => {
  // Grab username and password from body
  const creds = req.body;
  //  Hash the password
  const hash = bcrypt.hashSync(creds.password, 14);
  // Override the password with the hash
  creds.password = hash;
  // Svae the user to the database
  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ err: "There was an error, please try again" });
    });
});

// POST - login

server.post("/api/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Welcome!", token });
      } else {
        res.status(401).json({ message: "You shall not pass!!" });
      }
    })
    .catch(err => {
      res.status(500).json({ err: "There was an error, please try again." });
    });
});

// Protection

function protected(req, res, next) {
  next();
}

// POST - users

server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("username")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ err: "There was an error, please try again" });
    });
});

// Server

server.get("/", (req, res) => {
  res.send("Server Up And Running");
});

const port = 3000;
server.listen(port, () => console.log(`\nRunning on port ${port}\n`));
