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
        id: username.id
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
    const token = tokenGenerator(user.username.id)
    db.insert(user)
    .then(ids => {
        res.status(201).json({id: ids[0], token})
    })
})

server.post('/api/login', (req, res) => {
    const user = req.body;
    console.log(user)
    db.findUserById(user.username)
        .then(users => {
            if (user.password && bcrypt.compareSync(user.password, users[0].password, 10)) {
                const userId = tokenGenerator(user.username);
                res.json({ creds: 'correct', userId })
            } else {
                res.status(404).json({message: 'Username or Password incorrect'})
          }
            
        })
    })
    




























server.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
});