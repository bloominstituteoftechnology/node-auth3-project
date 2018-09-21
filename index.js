const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("knex");
const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

const secret = "theLawOfAttraction";

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "2d",
    jwtid: "33333"
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ msg: "Invalid Token" });
      } else {
        req.username = decodedToken;
      }
      next();
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

server.get("/", (req, res) => {
  res.send("does this server even work");
});

server.post("/api/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  console.log(creds)
  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      db("users")
        .where({ id })
        .first()
        .then(user => {
          console.log(user);
          const token = generateToken(user);
          console.log(token);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

server.post("/api/login", (req, res) => {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => res.status(500).send(err));
});

server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("id", "username", "password")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`Listening on port ${port}`));
