require('dotenv').config()
const express = require('express')
const db = require('../data/dbConfig.js')
const bcrypt = require('bcryptjs')
const route = express.Router()
const jwt = require('jsonwebtoken')

const generateToken = user => {
    const payload = {
        user
    }
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, secret, options)
}


route.post('/', (req, res) => {
    const creds = req.body;
    db('users')
    .where({username: creds.username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({message: `Welcome, ${user.username}.`, token})
        } else {
            res.status(401).json({message: 'Invalid username or password.'})
        }
    })
})

module.exports = route;