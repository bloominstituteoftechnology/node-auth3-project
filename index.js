const express = require("express");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbConfig = require("./knexfile");

const server = express();
const db = knex();

server.use(express.json());

const secret = "thisSecret";

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const option = {
    expiresIn: "12h",
    jwtid: "12345"
  };
  return jwt.sign(payload, secret, options);
}

const PORT = 3000;
server.listen(PORT, () => console.log(`\n Server running on port: ${PORT}`));
