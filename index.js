const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

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

// POST - users

server.get("/api/users", (req, res) => {
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
