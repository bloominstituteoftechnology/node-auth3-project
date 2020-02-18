const express = require('express');
// const jwt = require('jsonwebtoken')

const configMiddleware = require('./config-middleware.js')

const authRouter = require('./auth/auth-router')
const userRouter = require('./users/users-router')

const server = express();

configMiddleware(server);

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)

server.get('/', (res,req) => {
    res.send("It's Alive!");
})

// server.get('token', (res,req) => {
//     // generate a token
//     // return the token
//     const token = jwt.sign({
//         token: 'heres the token',
//         exp: 1000 * 60 * 5
//     }, 'secret')
//     res.status(400).json(token)
// })

module.exports = server;
