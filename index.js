const express = require("express");
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcryptjs");

const db = require("./data/dbConfig");
const configureMiddleware = require("./middleware");

const secret =
  "932EB5EA15E5A6497DA4DE9F1EF5FA111C79CF0FD576935E661989DCDFD424FC";

const server = express();
const PORT = 3300;

configureMiddleware(server);

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token." });
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
    jwtid: "027648"
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


  server.listen(PORT, () => {
    console.log(`\n=== API Listening on http://localhost:${PORT} ===\n`);
  });