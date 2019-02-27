const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
const db = require("./data/dbConfig.js");
const jwt = require("jsonwebtoken");

const server = express();
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("Working!");
});

server.get("/api/restricted/users", protected, async (req, res) => {
  try {
    const users = await db("users").select("id", "username");
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Error. Could not find any users." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error. Users could not be returned." });
  }
});

server.post("/api/register", async (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  try {
    const ids = await db("users").insert(creds);
    if (ids) {
      res.status(201).json(ids);
    } else {
      res.status(404).json({ message: "Error. Could not create account." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error. Could not create account." });
  }
});

function generateToken(user) {
  const payload = {
    username: user.username,
    name: user.name,
    roles: ["TA"]
    // Other data
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "60m"
  };

  return jwt.sign(payload, secret, options);
}

server.post("/api/login", async (req, res) => {
  const creds = req.body;
  try {
    const user = await db("users")
      .where({ username: creds.username })
      .first();
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: "User logged in successfully.",
        token,
        roles: token.roles
      });
    } else {
      res.status(404).json({ message: "Error. Invalid credentials." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error. User could not be logged in." });
  }
});

function protected(req, res, next) {
  // The auth token is normally sent in the Authorization header
  const token = req.headers.authorization;

  if (token) {
    // Verification process for logging in
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You're not authorized." });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You're not authorized." });
  }
}

function checkRole(role) {
  // Middleware to check if user is a TA
  return function(req, res, next) {
    if (req.decodedJWT.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: "You do not have access to this data." });
    }
  };
}

server.get("/users", protected, async (req, res) => {
  const users = await db("users").select("id", "username");
  res.status(200).json({ users, decodedToken: req.decodedJwt });
});

module.exports = server;
