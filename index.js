const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db_config = require('./knexfile');
const db = knex(db_config.development);

const server = express();
const PORT = 3300;

server.use(express.json());
server.use(cors());

function protected(req, res, next) {

}

server.post('/api/register', (req, res) => {
    const user = req.body;
    if (user.username && user.userpassword) {
        const hash = bcrypt.hashSync(user.password, 14);
        user.password = hash;
        db('users').insert(creds)
        .then((ids) => {
            res.status(201).json(ids);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
    }
})

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})