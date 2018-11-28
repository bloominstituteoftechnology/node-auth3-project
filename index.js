require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();
server.use(express.json());
server.use(cors());

server.post('/api/register', (req, res) => {
    // grab username and password from body
    const creds = req.body;
    // generate the hash from the user's password
    const hash = bcrypt.hashSync(creds.password, 4);
    // override the user.password with the hash
    creds.password = hash;
    // save the user to the database
    db('users')
        .insert(creds)
        .then(ids => res.status(201).json(ids))
        .catch(err => res.status(401).json(err))
});

function generateToken(user) {
    const payload = {
        subject: user.id, 
        username: user.username,
        roles: []
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '2m'
    };
    return jwt.sign(payload, secret, options);
};

server.post('/api/login', (req, res) => {
    // grab username and password from body
    const creds = req.body;
    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)) {
            // passwords match and user exists by that username
            // created a session > create a token
            // library sent cookie automatically > we send the token manually
            const token = generateToken(user);
            res.status(200).json({ message: 'welcome', token})
            } else {
            res.status(401).json({ message: 'you shall not pass!' })
            }
        })
        .catch(err => res.json(err));
});

function protected(req, res, next) {
    // token is normally sent in the the Authorization header
    const token = req.headers.authorization;
    if(token) {
        //it is valid
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                //token is invalid
                res.status(401).json({ message: 'token invalid'});
            } else {
                //token is good
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
    res.status(401).json({ message: 'you shall not pass!' });
    }
};

server.get('/api/users', protected, (req, res, next) => {
    db('users')
        .select('id', 'username', 'password')
        .then(users => res.status(200).json(users))
        .res.status(401).json({ message: 'you shall not pass!' })
});


server.listen(3300, () => console.log('\nrunning on port 3300\n'));
