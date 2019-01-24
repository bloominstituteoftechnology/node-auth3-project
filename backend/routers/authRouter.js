const express = require('express');
const bcrypt = require('bcryptjs');

const authHelper = require('../helpers/authHelper.js');
const usersDB = require('../data/helpers/usersHelper.js');

const router = express.Router();

router.post('/register', (req, res) => {
    const creds = req.body;
    creds.password = bcrypt.hashSync(creds.password, 16);
    usersDB.insertUser(creds)
        .then(ids => {
            if (ids.length) {
                const token = authHelper.generateToken(creds.username);
                res.status(201).json({username: creds.username, token});
            } else {
                res.status(400).json({message: "Unable to register user"});
            }
        })
        .catch(err => {
            res.status(500).json({message: "Server error"});
        });
});

router.post('/login', (req, res) => {
    const creds = req.body;
    usersDB.findByUsername(creds.username)
        .then(users => {
            if (users.length && bcrypt.compareSync(creds.password, users[0].password)) {
                const token = authHelper.generateToken(users[0].username);
                res.json({username: users[0].username, token});
            } else {
                res.status(401).json({message: "Invalid username or password"});
            }
        })
        .catch(err => {
            res.status(500).json({message: "Server error"});
        });
});

module.exports = router;