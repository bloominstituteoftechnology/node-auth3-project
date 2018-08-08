const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./data/db.js');
const cors = require('cors');
//const session = require('express-session');
const jwt = require('jsonwebtoken');

const server = express();
server.use(express.json());
server.use(cors());
/*server.use(
    session({
        name: "holyhandgrenade",
        secret: "Are you suggesting coconuts migrate?",
        cookie: {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            secure: false
        },
        httpOnly: true,
        resave: false,
        savUninitialized: false
    })
);*/
const secret = 'Are you suggesting coconuts migrate?'

function generateToken(user) {
    const payload = {
        username: user.username,
        password: user.password,
        department: user.department
    }
    const options = {
        expiresIn: '1m',
        }
        return jwt.sign(payload, secret, options)
}

function checkLogIn (req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            next()
        })

    }else {
        return res.status(401).json({error: 'Incorrect credentials'})
    }
}


server.get('/api/users', checkLogIn, (req, res) => {
    db('users').select('username', 'department')
    .then(response => {
            res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json('You shall not pass!')
    })
})

server.post('/api/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    db('users')
    .insert(credentials)
    .then(function(ids) {
        db('users')
        .where({id: ids[0]})
        .first()
        .then(user => {
            const token = generateToken(user);
            res.status(201).json(token);
        })
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error saving user to database.'})
    })
})

server.post('/api/login', (req, res) => {
    const credentials = req.body;
    db('users')
    .where({username: credentials.username}).first()
    .then(function(user) {
    if(user || bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
            res.status(201).json(token, 'Logged in.')
    }
    else {
        return res.status(401).json('You shall not pass!')
    }
})
})


server.listen(8000, console.log('API running'));