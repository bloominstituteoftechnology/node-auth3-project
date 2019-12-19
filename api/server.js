const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRoutes = require('../users/user_router');
const authRoutes = require('../auth/auth_router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRoutes);
server.use("/api/users", usersRoutes);

server.get('/', (req, res) => {
  res.status(200).send('department of justice');
});

module.exports = server;