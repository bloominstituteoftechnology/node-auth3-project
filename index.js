const express = require('express');
const helmet = require('helmet');
const knex = require('knex')
const cors = require('cors')
const server = express();
const bcrypt = require('bcryptjs');
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

server.post('/api/register', (req, res) => {
    const creds = req.body

    const hash = bcrypt.hashSync(creds.password, 5)

    creds.password = hash

    db('user').insert(req.body)
    .then(ids => {
        const id = ids[0]
        db('user').where({id}).first()
        .then(user => {
            const token =generateToken(user)
            res.status(201).json({id: user.id, token})
        })
        .catch(err => {
            console.log('/api/register err ', err)
            res.status(500).json({'message': err })
        })
    })
    .catch(err => {
        console.log('post error', err)
        res.status(500).json(err)
    })
})






const port = 3500;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});