require('dotenv').config() //reads from the .env file and places them below //add .env file to gitignore
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mwConfig = require('./api/server.js')
const db = require('./data/dbConfig.js')

const { authenticate } = require('./auth/authenticate')

const PORT = 9090;
const server = express()
server.use(express.json())


server.post('/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14)
    creds.password = hash
    db("users")
        .insert(creds)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(() => {
            res.status(500).json({ error: "Unable to register user"});
        })
});

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})