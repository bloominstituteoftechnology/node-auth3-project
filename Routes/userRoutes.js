const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db/dbConfig');
const { generateToken, protected } = require('../middleware/authentication');

const router = express.Router();

router.post('/register', (req, res) => {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;

    db('usernames')
        .insert(creds)
        .then(ids => {
            const id = ids[0];
            //find the user by the id

            db('usernames')
                .where({ id })
                .first()
                .then(user => {
                const token = generateToken(user);  
                res.status(201).json({ id: user.id, token }); 
            })
            .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
});

router.post('/login', (req, res) => {
    const creds = req.body;

    db('usernames')
        .where({ username: creds.username })
        .first().then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)) {

                const token = generateToken(user);
                
                res.status(200).send({ token });
            } else {
                res.status(401).json({ error: "You shall not pass!"})
            }
        })
        .catch(err => res.status(500).send(err))
});

router.get('/users', protected, (req, res) => {  // implemented protected middleware
    db('usernames')
        .select('id', 'username', 'password', 'department')
        .then(users => {
        res.status(200).send(users)
        })
        .catch(err => res.status(500).send(err));
});

module.exports = router;