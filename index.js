const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Its pronounced Frank-en-steen");
});

server.post("/api/register", (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  db.insert(credentials)
    .into("users")
    .then(user => {
      if (user) {
        res.status(201).json({ credentials });
      } else {
        res.status(404).send(err.message);
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, function(err, decodedToken) {
      if (err) {
        res.status(404).json({ err });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

const jwtSecret = "The secret was a dumb book";
function generateToken(user) {
  const jwtPayload = {
    ...user,
    greeting: "Hidey Ho Neighbor"
  };

  const jwtOptions = {
    expiresIn: "3m"
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

server.post("/api/login", (req, res) => {
  const credentials = req.body;

  db("users")
    .where({ name: credentials.name })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(404).json({ error: "You do not have access" });
      }
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

server.get("/api/users", protected, (req, res) => {
  console.log(req.decodedToken);

  db("users")
    .select("id", "name", "password")
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

const port = 4000;
server.listen(port, () => console.log(`server is running on ${port}`));
