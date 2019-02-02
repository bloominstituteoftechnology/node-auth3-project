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

server.post('/api/register', (req, res) => {
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 14)
    creds.password = hash
    db('users')
    .insert(creds)
    .then(ids => {
        res.status(201).json(ids)
    })
    .catch(() => {
        res.status(500).json({ error: 'Unable to register user.'})
    })
})

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