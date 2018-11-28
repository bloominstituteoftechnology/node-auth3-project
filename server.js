const express = require('express')
const cors = require('cors')
const helmet  = require('helmet')

//Route Files

// initialize server
server = express()

// Call middleware
server.use(express.json())
server.use(cors())
server.use(helmet())

// Endpoints

// Sanity Check
server.get('/', (req, res) => {
    res.json({message: 'Its Alive!'})
})

module.exports = server;
