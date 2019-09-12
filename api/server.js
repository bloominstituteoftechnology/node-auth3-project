const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

const registerRouter = require('../routes/register-router')
const loginRouter = require('../routes/login-router')
const usersRouter = require('../routes/users-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger('dev'));

server.use('/api/register', registerRouter )
server.use('/api/login', loginRouter )
server.use('/api/users', usersRouter )

module.exports = server;
