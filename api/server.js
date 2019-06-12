const express = require('express')
const helmet = require('helmet')
const cors = require('cors')


const authRouter = require('../auth/auth-router.js')
const userRouter = require('../user/user-router.js')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/auth', authRouter)
server.use('/users', userRouter)

server.get('/', (req, res) => {
    res.send('Server is up and running.')

})

module.exports = server;