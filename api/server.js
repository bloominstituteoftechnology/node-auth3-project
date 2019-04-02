const express = require('express');

const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const server = express();

const usersRouter = require('../routes/users/users-routes');
const authRouter = require('../routes/auth/auth-routes');

server.use(express.json(), helmet(), cors());
server.use(logger('dev'));

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.send("With Great Power, Comes Great Responsibility");
});

module.exports = server;