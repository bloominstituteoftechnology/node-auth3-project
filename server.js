const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// const authRouter = require('../routers/auth-router.js');
// const usersRouter = require('../routers/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use('/api', authRouter);
// server.use('/api', usersRouter);

server.get('/', (req, res) => {
  res.send("It's running smoothly");
});

module.exports = server;