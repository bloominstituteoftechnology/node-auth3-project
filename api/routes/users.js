const express = require('express')
const bcrypt = require('bcrypt')
const middleware = require('../middleware')
const codes = require('../helpers/codes')
const db = require('../../data/db')
const jwt = require('jsonwebtoken')

const server = express.Router()

// Register users
server.post('/register', (req, res, next) => {

    const credentials = req.body
    const hash = bcrypt.hashSync(credentials.password, 10)
    credentials.password = hash

     db('users')
        .insert(credentials)
        .then(function(ids) {
            db('users')
                .where({ id: ids[0] })
                .first()
                .then(user => {
                    // generate web token
                    const token = middleware.generateToken(user)
                    res.status(201).json(token)
                })
        })
        .catch(next)
})

//Login user
server.post('/login', middleware.getUser, (req, res) => {
    const passwordIn = req.body.password
    const user = req.userIn

    if(bcrypt.compareSync(passwordIn, user.password)){
        const token = middleware.generateToken(user)
        res.status(200).json(`Welcome ${user.userName}, Token: ${token}`)
    }else{
        return res.status(401).json({error: "Incorrect Credentials"})
    }
})



module.exports = server