// dependencies
const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const cors = require("cors");

const server = express();

// route imports
const register = require('./register')
const login = require('./login')
const users = require('./users')

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

// test route
server.get('/', (req, res) => {
  res.status(200).json({ message: 'api is up' })
})

// ROUTES
server.use('/api/register', register)
server.use('/api/login', login)
server.use('/api/users', users)

module.exports = server;
