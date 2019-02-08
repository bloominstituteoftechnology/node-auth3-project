const express = require("express")
const helmet = require("helmet")
const logger = require("logger")
const hash = require("bcryptjs")
const server = express()
const port = process.env.port || 3492

server.use(
 helmet(),
 logger('dev'),
 express.json()
)


server.post('/api/register', (req, res) => {

})

server.post('/api/login', (req, res) => {

})

server.get('/api/users', (req, res) => {

})

server.listen(port, () => {
 console.log(`Server is running live on ${port}`)
})