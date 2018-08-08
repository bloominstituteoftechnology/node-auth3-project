const server = require('express')() // Creates an instance of an express application
const helmet = require('helmet')
const morgan = require('morgan')
const apiRoutes = require('./api/apiRouter')

server.use(helmet())
server.use(morgan('tiny'))
server.use(express.json())
server.use('/', apiRoutes)


const port = 8000
server.get('/', (req, res) => {
    res.send(`Server running on port ${port}\n`)
})

