const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const db = require('./data/dbConfig.js')


const PORT = 5200
const server = express()
server.use(express.json())
server.use(cors())

// client sends credentials.
// server verify credentials.
// server creates a session for the client.
// server produces and sends back cookie.
// client stores the cookie.
// client sends cookie on every request.
// server verifies that cookie is valid.
// server provides access to resource.

server.get('/api/users', (req, res) => {
    db('users')
      .select('id', 'username', 'password') 
      .then(users => {
        res.json(users)
      })
      .catch(() => {
          res.status(500).json({ message: 'You shall not pass!'})
      })
  })

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})