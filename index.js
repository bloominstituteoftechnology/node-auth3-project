require("dotenv").config();

const PORT = 3800;
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();

const secret = process.env.JWT_SECRET;
// console.log(secret);

server.use(express.json());
server.use(cors());

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ["sales", "marketing", "support"]
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
}

server.listen(PORT, () => console.log("\nPORT is LIVE\n"));
