const express = require('express')

const server = express();

server.use('/api', require('./api/apiRoutes'))
server.get('/', (req, res) => {
  res.status(200).json({
    message: 'server up!'
  })
})

module.exports = server;