const express = require('express')
const cors = require('cors')
const server = express();
const userInfoRoutes = require('./userInfo/userInfoRouter')
const port = 4444;

server.use(express.json())
server.use(cors())

server.use('/api', userInfoRoutes)

server.listen(port, err => {
    console.log(`Server running at port: ${port}`)
})