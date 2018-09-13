const express = require("express");
const knex = require("knex");
const dbConfig = require("./knexfile");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

const secret = "the road to hell is paved with good intentions";

function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: "1hr",
    jwtid: "12345"
  };

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You shall not pass!" });
      } else {
        req.user = { username: decodedToken.username };

        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

server.get("/api/users", protected, (req, res) => {
  db("users")
    .select("username", "id", "department")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error(err);
    });
});

server.post("/api/register", (req, res) => {
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 8);

  db("users")
    .insert(user)
    .then(ids => {
      id = ids[0];

      db("users")
        .where({ id: id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
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
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).send(err));
});

server.listen(8000, () => {
  console.log("== LISTENING ON PORT 8K ==");
});
