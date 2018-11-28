const express = require('express');
const bcrypt = require('bcryptjs'); // adds hash library
const db = require('../database/dbConfig.js');

const router = express.Router();

// [GET] /api/users
// return all users
router.get('/users', (req, res) => {
    db('users')
        .select('id', 'username', 'department')
        .then(users => {
            if (users.length) {
                res.status(200).json(users);
            } else {
                res.status(200).json({ message: 'No users in database' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving users' });
        });
});

// [POST] /api/register
// create account with username and password, fails if username already exists
router.post('/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14);
    creds.password = hash;

    db('users')
        .insert(creds)
        .then(id => {
            res.status(201).json({ id: id[0] });
        })
        .catch(err => {
            if (err.errno === 19) {
                res.status(500).json({ message: 'Username already exists' });
            } else {
                res.status(500).json({ message: 'Error creating new account' });
            }
        });
});

module.exports = router;