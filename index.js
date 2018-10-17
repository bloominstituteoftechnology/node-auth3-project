const express = require('express');
const cors = require('cors');

const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig.js');

const server = express();

const jwt = require('jsonwebtoken');

server.use(express.json());
server.use(cors());

// sanity check
server.get('/', (req, res) => {
    res.send("It's allliiiiive!!");
});

server.post('/api/register', (req, res) => {

})

function generateToken(user) {

}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {

    } else {

    }
}

const port = 8989;
server.listen(port, () => console.log(`***API running on ${port}***`))