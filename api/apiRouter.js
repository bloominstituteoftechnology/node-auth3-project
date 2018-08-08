const express = require('express')
const users = require('./routes/users')

const api = express.Router()

api.get('/', (req, res) => {
    res.json("App is currently functioning")
})

api.use('/api', users)

module.exports = api