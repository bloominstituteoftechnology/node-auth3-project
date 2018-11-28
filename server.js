const express = require('express')
const cors = require('cors')
const helmet  = require('helmet')

//Route Files
const registerRoute = require('./routes/registerRoute.js')
const loginRoute = require('./routes/loginRoute.js')

// initialize server
server = express()

// Call middleware
server.use(express.json())
server.use(cors())
server.use(helmet())

// Endpoints
server.use('/api/register', registerRoute)
server.use('/api/login', loginRoute)

// Sanity Check
server.get('/', (req, res) => {
    res.json({message: 'Its Alive!'})
})

module.exports = server;
