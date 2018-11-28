require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../database/dbConfig.js');

const router = express.Router();

// imports customer middleware
const protected = require('../middleware/protectedMiddleware.js');
const checkDepartment = require('../middleware/checkDepartmentMiddleware.js');

// generates json web token
const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '1h',
    };

    return jwt.sign(payload, secret, options);
}

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

// [POST] /api/login
// user login, fails if username does not exist or password incorrect
router.post('/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: 'Successful login', token });
            } else {
                res.status(401).json({ message: 'Failed login; either username does not exist or password is incorrect'});
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed login'});
        });
});

// [GET] /api/users
// return all users within department
router.get('/users', protected, (req, res) => {
    db('users')
        .select('id', 'username', 'department')
        .where({ department: req.decodedToken.department })
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

// [GET] /api/AP
// only 'accounts payable' can see
router.get('/AP', protected, checkDepartment('accounts payable'), (req, res) => {
    res.json({ message: 'Only AP can see this message!' });
});

module.exports = router;