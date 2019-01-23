const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database/dbHelpers');

const server = express();

server.use(express.json());
server.use(cors())
const PORT = 2020;


tokenGenerator = (username) => {
    const payload = {
        username,
    }

    const secret = "shh don\'t tell noOne";

    const options = {
        expiresIn: '1h',
    }

    return jwt.sign(payload, secret, options);
}   


// registration end point inserts username and password to table
server.post('/api/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password)
    const token = tokenGenerator(user.username)
    db.insert(user)
    .then(ids => {
        res.status(201).json({id: ids[0], token})
    })
})




























server.listen(PORT, () => {
    Console.log(`Running on Port ${PORT}`)
});