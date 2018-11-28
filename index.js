require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./dbConfig');

const server = express();
server.use(express.json());
server.use(cors());

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        departments: ['sales', 'marketing', 'HR', 'QA']
    };

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '10m'
    }
    return jwt.sign(payload, secret, options)
}

// ============= MIDDLEWARE =========================
    function protected(req, res, next) {
        const token = req.headers.authorization;
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if(err) {
                    res.status(401).json({ message: 'Invalid Token' })
                } else {
                    req.decodedToken = decodedToken;
                    next();
                }
            })
        } else {
            res.status(401).json({message:'Token not provided'})
        }
    }

    function checkDepartment(dept) {
        return function(req, res, next) {
            if (req.decodedToken && req.decodedToken.departments.includes(dept)) {
                next();
            } else {
                res.status(401).json({ message: 'Access Denied UwU'})
            }
        }
    }


// =============== MIDDLEWARE ===========================

// ================ ENDPOINTS ==========================
server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 3);
    creds.password = hash;

    db('users')
    .insert(creds).then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => res.status(401).json(err))
})

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: 'Welcome', token})
        } else {
            res.status(401).json({ message: 'De-de-de-denied!!'})
        }
    })
    .catch(err => res.json(err))
})

server.get('/api/users', protected, checkDepartment('HR'), (req, res) => {
    db('users')
    .select('id', 'username')
    .then(users => {
        res.json(users)
    })
    .catch(err => res.send(err))
})

// ================ ENDPOINTS ==========================

const PORT = 4200;
server.listen(PORT, () => console.log(`${PORT}`))