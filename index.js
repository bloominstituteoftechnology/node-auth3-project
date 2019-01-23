// Define dependancies //
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./database/dbHelpers.js');
const session = require('express-session');

const server = express();

// Set up use's && session //
server.use(express.json());
server.use(cors());
server.use(session({
    name: 'notsession',
    secret: 'lmao',
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
}));

// Use Middleware //
function protect(req, res) => {
    if(req.session && req.session.userId){
        next();
    } else {
        res.status(500).send("Invalid Credentials");
    }
}

// Users Endpoint //
server.get('/api/users', protect, (req, res) => {
    console.log('session', req.session);
    if(req.session && req.session.userId){
        db.findUsers()
            .then(users => {
                res.json(users);
        })
        .catch(err => {
            res.status(500).send(err);
        })
    } else {
        res.status(400).send('ACCESS DENIED');
    }
});

// Login Endpoint //

// Register Endpoint //

// Listen //
server.listen(3300, () => console.log('\nrunning on port 3300\n'));
