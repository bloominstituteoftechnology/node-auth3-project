require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");

const db = require("./database/dbconfig");

const server = express();

server.use(express.json());
server.use(cors());

// server.post('api/register', (req, res) => {
//   //get username and password from body
//   const creds = req.body;
//   //generate hash
//   const hash = bcrypt.hashSync(creds.password, 10);
//   //override the password with hash
//   creds.password = hash;
//   db('users')
//   .insert(creds)
//   .then(ids => {
//     res.status(201).json(ids)
//   })
//   .catch( err => json({ message: 'error adding user to the DB', err}))
// })

server.post("/api/register", (req, res) => {
  // grab username and password from body
  const creds = req.body;

  // generate the hash from the user's password
  const hash = bcrypt.hashSync(creds.password, 4); // rounds is 2^X

  // override the user.password with the hash
  creds.password = hash;

  // save the user to the database
  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => json(err));
});

server.get("/", (req, res) => {
  res.send("Its Alive!");
});

server.listen(4200, () => console.log("running on port 4200"));
