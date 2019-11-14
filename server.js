const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config()

// const userRouter = require('../users/user-router');

const server = express();

server
    .use(helmet())
    .use(express.json())
    .use(cors());

// server.use('/api/users', userRouter)

server.get('/', (req, res) => {
    res.send('Server is Working!')
})

module.exports = server;