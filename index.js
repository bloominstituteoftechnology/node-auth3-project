const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfing.js');

const server = express();

server.use(express.json());
server.use(cors());
require('dotenv').config();

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1m'
    };

    return jwt.sign(payload, secret, options);
}

server.post('/api/register', (req, res) => {
    // get username and passowrd from body
    const creds = req.body;

    // generate hash from user password
    const hash = bcrypt.hashSync(creds.password, 14);

    // override the user.pasword with the hash
    creds.password = hash;

    // save the user to the database
    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json(creds);
        })
        .catch(err => {
            res.status(401).json({message: err})
        })
});

server.post('/api/login', (req, res) => {
    // get usenname and password from body
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)) {
                // password match and user exist by the username
                const token = generateToken(user);
                res.status(200).json({message: 'welcome', token});
            } else {
                // either username is invalid or password is wrong
                res.status(401).json({message:'You shall not pass!'})
            }
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
});

server.get('/api/users', protected, (req, res) => {
    db('users')
        .select('id', 'username', 'password', 'department')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: 'invalid token'});
            } else {
                req.decodedToken = decodedToken;
                next()
            }
        })
    } else {
        res.status(401).json({message: 'not token provided'})
    }
}




server.get('/', (req, res) => {
    res.send('server is working')
});

server.listen(9000, ()=> console.log('\nrunning on port 9000\n'))