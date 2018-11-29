require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig');

const server = express();

server.use(express.json());
server.use(cors());

const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, secret, options)
}

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 8); 
    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(error => json({error}));
});

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username }).first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)){
                const token = generateToken(user);
                res.status(200).json({message: 'WELCOME!', token});
            }else{
                res.status(401).json({message: 'You are not allowed here'});
            }
        })
        .catch(error => res.json({error}))
})


const protected = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ message: 'invalid token' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'no token provided' });
    }
}


const checkDepartment = (department) => {
    return function (req, res, next) {
        if (req.decodedToken && req.decodedToken.department.includes(department)) {
            next();
        } else {
            res.status(403).json({ message: 'you cannot access this resource' });
        }
    }
}

server.get('/api/users', protected, checkDepartment('FSW14'), (req, res) => {
    db('users')
        .select('id', 'username', 'password', 'department')
        .then(users => {
            res.json(users);
        })
        .catch(error => res.send(error));
});

const port = 8000;
server.listen(port, () => console.log(`running on port: ${port}`));