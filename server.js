const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const apiRoutes = require('./api/apiRouter')

const server = express()
server.use(helmet())
server.use(morgan('tiny'))
server.use(express.json())

server.use('/', apiRoutes)


const port = 8000
server.listen(port, () => {
    console.log(`Server running on port ${port}\n`)
})

