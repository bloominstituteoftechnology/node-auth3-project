const express = require('express');
const db = require('../data/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secret = "I can sleep now I think";

function generateToken(user) {
    const payload = {
      username: user.username
    }

    const options = {
      expiresIn: '5h',
      jwtid: '9123910'
    }

    return jwt.sign(payload, secret, options);
}

router.post('/', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    db('users').insert(user).then(id => {
        db('users').where({ id: id[0] })
        .first().then(user => {
        const token = generateToken(user);
            res.status(201).json(token);
        }).catch(err => {
            res.status(500).json(err)  
        })
    })
})

module.exports = router;