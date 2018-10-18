require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'add a secret to your .env file with this key';

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

//register
server.post('/api/register', (req, res) => {
    //username, password, department
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 12);
    credentials.password = hash;

    db('users')
        .insert(credentials)
        .then(ids => {
            const id = ids[0];
            res.status(201).json({ userId: id});
        })
        .catch(err => {
            res.status(500).json({ message: 'Error creating user', Error: err })
        })
})

//login
function generateToken(user) {
    const jwtPayload = {
        id: user.id,
        role: 'admin'
    };

    const jwtOptions = {
        expiresIn: '30m'
    };

    return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

server.post('/api/login', (req, res) => {
    const credentials = req.body;

    db('users')
        .where({ username: credentials.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ welcome: user.username, token: token })
            } else {
                res.status(401).json({ message: 'Invalid username or password' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

//get, protected
server.get('/api/users', protected, checkRole('admin'), (req, res) => {
    db('users')
        .select('id', 'username', 'department')
        .then(users => {
            res.status(200).json({ users });
        })
        .catch(err => res.status(500).json({ error: err }));
});

function protected(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: 'invalid token'});
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(500).json({ message: 'No token provided'});
    };
};

function checkRole(role) {
    return function(req, res, next) {
        if(req.decodedToken && req.decodedToken.role === role) {
            next();
        } else {
            res.status(403).json({ message: 'Not an admin'});
        };
    };
}

server.listen(9000, () => console.log('\nRunning on port 9000\n'));