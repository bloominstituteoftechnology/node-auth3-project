require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./database/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user) {
  const payload = {
    username: user.username,
    department: ["test", "test2"]
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
}

server.post("/api/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "welcome!", token });
      } else {
        res.status(401).json({ message: "you shall not pass!!" });
      }
    })
    .catch(err => res.json(err));
});

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "invalid token" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "not token provided" });
  }
}

server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("id", "username", "department")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// function checkRole(role) {
//   return function(req, res, next) {
//     if (req.decodedToken && req.decodedToken.roles.includes(role)) {
//       next();
//     } else {
//       res.status(403).json({ message: "you have no access to this resource" });
//     }
//   };
// }

server.post("/api/register", (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 4);
  creds.password = hash;
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

server.listen(3300, () => console.log("\nrunning on port 3300\n"));
