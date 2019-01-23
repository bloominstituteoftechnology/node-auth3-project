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

module.exports = server;
