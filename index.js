const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')


const server = express();
const PORT = process.env.PORT || 4500;
const db = require('./data/helpers/dataHelper')

server.use(express.json())
// May add cors orgin to make sure it is allowed.

server.post('/api/register', (req, res) => {

})

server.post('/api/login', (req, res) => {

})

server.get('/api/users', (req, res) => {
    db.getUser()
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


server.listen(PORT, () => {
    console.log(`\n === JWT AUTH-II Listening on:${PORT} === \n`)
})