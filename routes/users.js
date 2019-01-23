const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const userDB = require('../data/helpers/userDb');


router.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 15);

    userDB.add(user)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to insert user' });
        }) 
});

router.post('/login', (req, res) => {
   const user = req.body;
   
   userDB.get(user)
    .then(users => {
        if(users.length && bcrypt.compareSync(user.password, users[0].password)) {
            const token = jwt.sign({ username: users[0].username }, 'shhhhh');
            res.json({ message: 'Logged in', token: token });
        } else {
            res.status(404).json({ message: 'You shall not pass' });
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Failed to verify. Please try again.' });
    });
});

router.get('/users', (req, res) => {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, 'shhhhh', function(err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        } else {
            userDB.findUsers()
                .then(users => {
                    res.json(users);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
        }
    });
});

module.exports = router;