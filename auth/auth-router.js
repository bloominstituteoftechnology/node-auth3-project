const router = require('express').Router();
const bctypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../secrets.js');
const Users = require('../users/user-model');

router.post('/register', (req,res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(err => {
        res.status(500).json(err)
    })
})