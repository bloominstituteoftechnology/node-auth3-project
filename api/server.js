// dependencies
const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const cors = require("cors");

const server = express();

// middleware
server.use(express.json());
server.use(cors());

// generate JWT token
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: ['marketing', 'development']
  }

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, secret, options)
}

server.get('/', (req, res) => {
  res.status(200).json({ message: 'api is up' })
})

module.exports = server;
