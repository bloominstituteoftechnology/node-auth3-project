const express = require("express");

const knex = require("knex");
const router = express.Router();
const bcrypt = require("bcryptjs");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

function makeToken(user) {
  const payload = {
    username: user.username
  };

  const secret = "shhhhh";

  const options = {
    expiresIn: "1h",
    jwtid: "54321"
  };
  const token = jwt.sign(payload, secret, options);
}

module.exports = router;
