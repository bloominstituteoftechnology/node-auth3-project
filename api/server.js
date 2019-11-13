const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

const auth = require('../routes/auth-router.js')
const users = require('../routes/user-router')

server.use('/api/auth/', auth)
server.use('/api/users', users)

module.exports = server;


