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

server.get("/api/restricted/users", restricted, protected, async (req, res) => {
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
    name: user.name
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "10m"
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
      res.status(200).json({ message: "User logged in successfully.", token });
    } else {
      res.status(404).json({ message: "Error. User could not be logged in." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error. User could not be logged in." });
  }
});

server.get("/users", protected, async (req, res) => {
  const users = await db("users").select("id", "username");
  res.status(200).json(users);
});

// server.get("/api/logout", (req, res) => {
//   if (req.session) {
//     req.session.destroy(err => {
//       if (err) {
//         res.status(500).json({ message: "There was an error logging out." });
//       } else {
//         res.status(200).json({ message: "User was successfully logged out." });
//       }
//     });
//   } else {
//     res.json({ message: "Logged out already." });
//   }
// });

module.exports = server;
