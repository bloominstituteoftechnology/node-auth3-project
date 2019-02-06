const express = require('express')

const server = express()

server.use(express.json())

//Routes
const authRoute = require('./data/routes/authRoute')
const usersRoute = require('./data/routes/usersRoute')

server.use('/api/', authRoute)
server.use('/api/users', usersRoute)

//Listening
const PORT = 3300
server.listen(PORT, () => {
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`)
})

