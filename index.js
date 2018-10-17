const express = require('express')
const server = express();
const userInfoRoutes = require('./userInfo/userInfoRouter')
const port = 4444;

server.use(express.json())

server.use('/api', userInfoRoutes)

server.listen(port, err => {
    console.log(`Server running at port: ${port}`)
})