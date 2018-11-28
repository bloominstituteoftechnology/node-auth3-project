require("dotenv").config();

const express = require("express");
const knex = require("knex");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const knexConfig = require("./knexfile");

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => res.send("Welcome!"));

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "5m"
  };
  return jwt.sign(payload, secret, options);
};

server.post("/api/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
});

server.post("/api/login", (req, res) => {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Logged In Successful!", token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).json(err));
});

const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token." });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided so no entry." });
  }
};

server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("id", "username", "department")
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
});

const port = 8000;
server.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
