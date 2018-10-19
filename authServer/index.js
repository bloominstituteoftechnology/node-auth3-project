require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

// register endpoint
server.post("/api/register", (req, res) => {
  // set the credentials const
  const credentials = req.body;

  // use bcrypt to hash the password
  const hash = bcrypt.hashSync(credentials.password, 14);

  // set the credentials.password to the newly created hash
  credentials.password = hash;

  // insert the credentials in to the users table
  db("users")
    .insert(credentials)
    .then(ids => {
      const id = ids[0];

      // query the database to get the user to generate the token
      const token = tokenGenerator({ username: credentials.username });
      // output the id and token
      res.status(201).json({ newUserId: id, token });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// create a jwtSecret from the .env file if
const jwtSecret =
  process.env.JWT_SECRET || "add a secret to your .env file with the key";

function tokenGenerator(user) {
  const jwtPayload = {
    ...user,
    hello: "DECADEV",
    roles: ["admin", "root", "user"]
  };
  const jwtOptions = {
    expiresIn: "1h"
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

server.post("/api/login", (req, res) => {
  const creds = req.body;

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = tokenGenerator(user); // new line
        res.status(200).json({ welcome: user.username, token });
      } else {
        res.status(401).json({ message: "you shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// protect this route, only authenticated users should see it
server.get("/api/users", protected, checkRole("admin"), (req, res) => {
  db("users")
    .select("id", "username", "password", "department", "email", "avatar")
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.send(err));
});

function protected(req, res, next) {
  // authentication tokens are normally sent as a header instead of the body
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // if token verification failed
        res.status(401).json({ message: "the invalid is token" });
      } else {
        // if token is valid
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token was provided" });
  }
}

function checkRole(role) {
  return function(req, res, next) {
    if (req.decodedToken && req.decodedToken.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: "you shall not pass! forbidden!" });
    }
  };
}

const port = process.env.PORT || 9001;
server.listen(port, () =>
  console.log(`\n=== API listening on port ${port} ===\n`)
);
