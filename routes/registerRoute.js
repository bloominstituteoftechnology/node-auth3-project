const express = require('express')
const db = require('../data/dbConfig.js')
const bcrypt = require('bcryptjs')
const route = express.Router()

route.post('/', (req, res) => {
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 14)
    creds.password = hash

    db('users')
    .insert(creds)
    .then(ids => {
        res.status(201).json({message: `Success! New user created with the ID of ${ids}`})
    })
    .catch(err => res.status(500).json({message: `An error occured: ${err}`}))
})

module.exports = route