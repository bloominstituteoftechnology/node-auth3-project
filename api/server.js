const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const AuthRouter = require('../auth/auth-router.js')
const UsersRouter = require('../users/users-router.js')

const server = express()

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', AuthRouter)
server.use('/api/users', UsersRouter)

server.get('/', (req, res) => {
    res.send("Hi")
})

module.exports = server;