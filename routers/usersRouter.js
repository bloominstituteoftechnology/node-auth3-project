const usersDb = require("../data/helpers/usersDb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();
const secret = "She-Ra"

module.exports = {
  router,
  secret
}
