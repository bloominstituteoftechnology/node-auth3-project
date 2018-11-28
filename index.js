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

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ["admin", "grunts", "big boss"]
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1m"
  };
  return jwt.sign(payload, secret, options);
}

server.post("api/register", (req, res) => {
  //get username and password from body
  const creds = req.body;
  //generate hash
  const hash = bcrypt.hashSync(creds.password, 10);
  //override the password with hash
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => json({ message: "error adding user to the DB", err }));
});

server.post("/api/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "welcome", token });
      } else {
        res.status(401).json({ message: "not authorized" });
      }
    })
    .catch(err => res.json({ message: "error", err }));
});

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: "invalid token", err });
      } else {
        req.decodeToken = decodeToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("id", "username", "password")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.listen(4200, () => console.log("running on port 4200"));
