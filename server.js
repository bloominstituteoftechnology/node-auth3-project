const express = require('express')
const cors = require('cors')

 //Route Files
const registerRoute = require('./routes/registerRoute.js')
const loginRoute = require('./routes/loginRoute.js')
const usersRoute = require('./routes/usersRoute.js')
 // initialize server
server = express()

server.use(express.json())
server.use(cors())

server.use('/api/register', registerRoute)
server.use('/api/login', loginRoute)
server.use('/api/users', usersRoute)

module.exports = server;