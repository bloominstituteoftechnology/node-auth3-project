const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()

const auth = require('../routes/auth-router.js')
const users = require('../routes/user-router')

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());



server.use('/api/auth/', auth)
server.use('/api/users', users)

server.get('/', (req,res) => {
    res.send('Hello! TOKENS!!!')
})

module.exports = server;


