const express = require('express');
const helmet = require('helmet');
const knex = require('knex')
const cors = require('cors')
const server = express();
const dbConfig = require('./db/knexfile')
const jwt = require('jsonwebtoken')

const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());
server.use(cors())

const secret = 'this is a secret'

const generateToken = user => {
    const payload = {
        username: user.username
    }

    const options = {
        expiresIn = '2h',
        jwtid: '12345'
    }

    const token = jwt.sign(payload, secret, options)
    return token
}



server.get('/', (req, res) => {
    res.send('Api Online')
})








const port = 3500;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});