require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('./database/dbConfig')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

server.get('/', (req, res) => {
    console.log('Working...')
    res.send('Server is alive!')
})

server.listen((port = 3300), () => console.log(`Server is up and running on port ${port}`))
