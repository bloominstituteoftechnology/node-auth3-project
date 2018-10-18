require("dotenv").config;
const express = require("express");
const bcrypt = require("bcryptjs");
const {
  secret,
  tokenGenerator,
  restrictionMiddleware
} = require("./middleware");
const db = require("./data/dbConfig.js");
const morgan = require("morgan");
const cors = require("cors");
const port = 9001;
const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.post("/api/register", async (req, res) => {
  try {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    const newUserId = await db("users").insert(credentials);
    try {
      const user = await db("users")
        .where({ id: newUserId[0] })
        .first();
      const token = tokenGenerator(user);
      return res.status(201).send(token);
    } catch (error) {
      return res.status(404).json({ message: "the user does not exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "the user could not be registered" });
  }
});

server.post("/api/login", async (req, res) => {
  try {
    const credentials = req.body;
    const user = await db("users")
      .where({ username: credentials.username })
      .first();
    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      const token = tokenGenerator(user);
      return res.status(200).send(token);
    } else {
      return res
        .status(404)
        .json({ message: "You shall not pass! Attempt was logged!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred during the login process" });
  }
});

server.get("/api/users", restrictionMiddleware, async (req, res) => {
  try {
    const allUsers = await db("users").select("id", "username", "department");
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: "Users could not be fetched." });
  }
});

server.listen(port, () =>
  console.log(`\n === API running on port ${port} ===\n`)
);
