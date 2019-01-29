const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const bcrypt = require("bcryptjs"); // added
const jwt = require("jsonwebtoken");
const cors = require("cors");

const knexConfig = require("../knexfile.js");

const server = express();

const db = knex(knexConfig.development);

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("sanity check");
});

module.exports = server;
