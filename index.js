const express = require("express");
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcryptjs");

const db = require("./data/dbConfig");
const configureMiddleware = require("./middleware");

const secret = "BIGBOB454624EEE54TT54efg445GHJ";

const server = express();
const PORT = 3300;

configureMiddleware(server);

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided." });
  }
}

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "1h",
    jwtid: "023076"
  };

  return jwt.sign(payload, secret, options);
}

server.get("/", (req, res) => {
  res.send("Live Server!");
});

server.post("/api/register", (req, res) => {
  const credentials = req.body;
  const hash = bcyrpt.hashSync(credentials.password, 14);
  credentials.password = hash;

  db("users")
    .insert(credentials)
    .then(ids => {
      const id = ids[0];

      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/api/login", (req, res) => {
  const credentials = req.body;

  db("users")
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcyrpt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Logged in", token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

server.get("/api/users", restricted, (req, res) => {
  db("users")
    .select("id", "username")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.send(err);
    });
});

server.listen(PORT, () => {
  console.log(`\n=== API Listening on http://localhost:${PORT} ===\n`);
});
