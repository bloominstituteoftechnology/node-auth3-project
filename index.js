require("dotenv").config();

const express = require("express");

const cors = require("cors");
const bcrypt = require("bcryptjs");
const knex = require("knex");
const jwt = require("jsonwebtoken");

//set up db
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);

const server = express();

//apply middleware
server.use(express.json());
server.use(cors());

server.listen(9000, () => {
  console.log("API IS RUNNING...");
});

//token secret key
const secret = process.env.JWT_SECRET;

//Routes
server.post("/api/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;

  db("users")
    .insert(creds)
    .then(idObj => {
      const id = idObj[0];
      db("users")
        .where({ id: id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(200).json({ username: user.username, token });
        })
        .catch(err =>
          res.status(500).json({ error: "There was an error registering" })
        );
    })
    .catch(err => res.status(500).json(err));
});

function generateToken(user) {
  const payload = {
    ...user
  };
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
}
server.post("/api/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ hi: user.username, token });
      } else res.status(500).json({ error: "You shall not pass" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "You shall not pass", err });
    });
});

function protected(req, res, next) {
  const token = req.headers.authorization;
  console.log(req.headers);
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        console.log(token);
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Not authorized, no token" });
  }
}

server.get("/api/users", protected, (req, res) => {
  db("users")
    .then(users => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});
