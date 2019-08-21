const express = require('express');
const session = require('express-session');
const UserRouter = require('./router');

const server = express();
const sessionConfig = {
    name: 'cookiemonsta',
    secret: 'shhh dont tell',
    cookie: {
        maxAge: 1000 * 800,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
}

server.use(session(sessionConfig))
server.use(express.json());
server.use('/api', UserRouter);

module.exports = server;