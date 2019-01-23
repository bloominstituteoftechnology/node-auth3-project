const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const bcrypt = require("bcryptjs"); // added

const knexConfig = require("../knexfile.js");

const server = express();

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Test test 1 2 3");
});

server.post("/register", async (req, res) => {
  try {
    const userCredentials = req.body;
    const hash = bcrypt.hashSync(userCredentials.password, 12);
    userCredentials.password = hash;

    const newUser = await db("users").insert(userCredentials);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "REgister failed. Please try again" });
  }
});

module.exports = server;
