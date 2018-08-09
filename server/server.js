const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./data/db.js");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const server = express();

const secret = "tacos tacos tacos"; //secret

// create Protected function
function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "Nope - token invalid" });
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: "Nope - no token" });
  }
}

//Generate Token
function generateToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: "1h",
    jwtid: "872891"
  };

  return jwt.sign(payload, secret, options);
}

server.use(express.json());
server.use(cors());

//Can get here
server.get("/", (req, res) => {
  res.send("We're running!");
});

// Register User
server.post("/api/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db("users")
    .insert(user)
    .then(user => {
      // generate the token
      const token = generateToken(user);
      res.status(201).json(token);
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

// Log In User
server.post("/api/login", function(req, res) {
  const credentials = req.body;
  db("users")
    .where({ username: credentials.username })
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.send(token);
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

//Get Users
server.get("/api/users", protected, (req, res) => {
  db("users")
    .select('id', 'username', 'department')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
