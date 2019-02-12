const express = require('express')
const helmet= require('helmet')
const logger = require('morgan')
const cors = require('cors')

module.exports = server => {
    server.use(express.json(),logger('tiny'), helmet(),cors())
}
//cors allows server to interact with a url that is different from that of the server