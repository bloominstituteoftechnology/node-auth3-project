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
      jwtid: '0123219031'
    }

    return jwt.sign(payload, secret, options);
}

router.post('/', (req, res) => {
    const authentication = req.body;
    console.log(authentication)

    db('users').where({username: authentication.username}).first().then(user => {
        console.log(user)
        if (user && bcrypt.compareSync(authentication.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json(user, token)
            console.log(authentication) 
        } else {
            return res.status(401).json({error: 'Invalid credentials'});
        }
    }).catch(err => {
    res.status(500).json(err)
    })
})

module.exports = router;
