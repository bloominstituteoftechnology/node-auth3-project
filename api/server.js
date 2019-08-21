const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/auth-router');
const userRouter = require('./user/user-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.status(200).json('server is running go catch it');
})

module.exports = server;