const express = require('express')
const cors = require('cors')
const server = express(); 
const port = 8765
const userRoute = require('./users.js')

server.use(express.json(), cors())



server.listen(port, () => { console.log("server is running on port " + port)})
