const express = require("express");
const db = require("../data/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

const secret = "I am the man";

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: "You shall not pass! Wrong token!" });
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: "You shall not pass! No token!" });
  }
}

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "1h",
    jwtid: "8728391"
  };

  return jwt.sign(payload, secret, options);
}

server.get("/", (req, res) => {
  res.send("up and running...");
});

// POST register
server.post("/api/register", function(req, res) {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db("users")
    .insert(user)
    .then(function(ids) {
      db("users")
        .where({ id: ids[0] })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json(token);
        });
    })
    .catch(function(error) {
      res.status(500).json({ error: "Could not register user" });
    });
});

// POST login
server.post("/api/login", (req, res) => {
  const credentials = req.body;
  db("users")
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.send(token);
      }
      return res.status(401).json({
        errorMessage:
          "The username and password you entered did not match our records. You shall not pass!"
      });
    })
    .catch(err => {
      res.status(500).json({ error: "Could not login user" });
    });
});

//GET users
server.get("/api/users", protected, (req, res) => {
  console.log("token", req.jwtToken);
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not display users" });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
