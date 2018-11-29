require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bcrypt = require('bcryptjs')
const db = require('./database/dbConfig')
const generateToken = require('./generateToken.js')
const protected = require('./protected.js')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

server.get('/', (req, res) => {
    console.log('Working...')
    res.send('Server is alive!')
})

server.post('/api/login', async (req, res) => {
    try {
        const creds = req.body
        const user = await db('users').where('username', "=", creds.username).first()
        if (user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user)
            console.log(token)
            res.status(201).json({ id: user.id, token })
        }
        else {
            res.status(401).json({ message: 'Unauthorized Request' })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'An error occuried while trying to attempt this process with the database.' })
    }
})

server.post('/api/register', async (req, res) => {
    try {
        const creds = req.body
        const hash = bcrypt.hashSync(creds.password, 14)
        creds.password = hash
        const id = await db('users').insert(creds)
        res.status(201).json(id)
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'An error has occuried while trying to register with the database.' })
    }
})

server.get('/api/users', protected, async (req, res) => {
   const department = req.decodedToken.department
    try {
        const users = await db('users').select('id', 'username', 'department').where('department', department)
        res.status(200).json(users)
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'error' })
    }
})

server.listen((port = 3300), () => console.log(`Server is up and running on port ${port}`))
