const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

const authRouter = require('./auth/auth-router');
server.use('/auth', authRouter);
const usersRouter = require('./users/users-router');
server.use('/users', usersRouter);
 
module.exports = server
