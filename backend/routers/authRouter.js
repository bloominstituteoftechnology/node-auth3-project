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
            res.status(201).json({username: creds.username});
        })
        .catch(err => {
            res.status(500).json({err: "Server error"});
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
                res.status(404).json({message: "Invalid username or password"});
            }
        })
        .catch(err => {
            res.status(500).json({err: "Server error"});
        });
});

module.exports = router;