/// ---- Node Dependencies ----
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();
const db = require("./data/expressDb.js");

const jwtSecret = "Do you know the muffin man?";

/// ---- Connect Middleware ----
server.use(express.json(), cors(), helmet());

server.get("/", (req, res) => {
  res.send(`HELLO World!`);
});

/// ---- CREATE User Endpoint ----
server.route("/api/register").post((req, res) => {
  const user = req.body;

  // ---- Hash User Password ----
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db("users")
    .insert(user)
    .then(ids => {
      const id = ids[0];
      return res.status(201).json({ newUserId: id });
    })
    .catch(err => res.status(500).json(err));
});

/// ---- CREATE User Login Endpoint ----
server.route("/api/login").post((req, res) => {
  const credentials = req.body;
  db("users")
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        return res.status(200).json({ Welcome: user.username, token });
      }
      return res.status(401).json({ Message: "You shall not pass!" });
    })
    .catch(err => res.status(500).json(err));
});

function generateToken(user) {
  const jwtPayload = {
    ...user,
    role: "admin"
  };
  const jwtOptions = {
    expiresIn: "5m"
  };
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
  
} // ---- Token Authorization ----
function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // Token verification failed
        return res.status(401).json({ Message: "Invalid Token" });
      } else {
        // Token verification successful
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    return res.status(401).json({ Message: "No token provided!" });
  }
}

/// ---- RETRIEVE Users Endpoint ----
server.route("/api/users").get(protected, (req, res) => {
  console.log("\n** decoded token information **\n", req.decodedToken);
  db("users")
    .select("id", "username", "password", "department")
    .then(users => {
      return res.json({ users });
    })
    .catch(err => res.send(err));
});

/// ---- Server Port and Listen Method ----
const port = 4400;
server.listen(port, console.log(`\n Server Listening on Port ${port} \n`));
