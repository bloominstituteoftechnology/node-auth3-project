require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

module.exports = (server) => {
  server.use(express.json())
  server.use(logger('dev'))
  server.use(helmet())
  server.use(cors())
}
