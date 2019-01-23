require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const knexConfig = require("../knexfile.js");

const server = express();

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("sanity check");
});

server.post("/register", (req, res) => {
  const userInfo = req.body;

  const hash = bcrypt.hashSync(userInfo.password, 12);

  userInfo.password = hash;

  db("decodedToken")
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

const generateToken = user => {
  const payload = {
    username: user.username,
    name: user.name
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "10m"
  };

  return jwt.sign(payload, secret, options);
};

server.post("/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        // login successful
        // create web token
        const token = generateToken(user);

        res.status(200).json({ message: `welcome ${user.name}`, token });
      } else {
        res.status(401).json({ you: "shall not pass!!" });
      }
    })
    .catch(err => res.status(500).json(err));
});

// protected middleware is like a lock and the token will be the key to unlock it
function protected(req, res, next) {
  // the auth token is normally sent in the Authorization header
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
}

// protect this endpoint so only logged in users can see it
server.get("/users", protected, async (req, res) => {
  const users = await db("users").select("id", "username", "name");

  res.status(200).json({ users, decodedToken: req.decodedToken });
});

module.exports = server;
