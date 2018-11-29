require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig');
const server = express();

const generateToken = (user) => {

    const payload = {
        subject: user.userId,
        username: user.username,
        roles: ['admin']
    }

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}

const protected = (req, res, next) => {
    const token = req.headers.authentication;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: 'invalid token'})
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({message: 'no token provided'})
    }
}

server.use(express.json());
server.use(cors());


server.post('/api/register', (req, res) => {
    const creds = req.body;

    if(!creds.username || !creds.password) {
        res.status(422).json({message: 'username and password both required'});
        return;
    }
    
    const hash = bcrypt.hashSync(creds.password, 8);
    creds.password = hash;
    // console.log(creds);
    db('users')
        .insert(creds)
        .then(ids => {
            const token = generateToken(creds);
            res.status(201).json({ids, token})
        })
        .catch(err => res.json(err));
});

server.post('/api/login', (req, res) => {
    const creds = req.body;

    if(!creds.username || !creds.password) {
        res.status(422).json({message: 'username and password both required'});
        return;
    }

    db('users').where({username: creds.username}).first()
    .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)){
            const token = generateToken(user);
            res.status(200).json({message: 'success', token})
        } else {
            res.status(401).json({ message: 'error loggin in' });
        }
    })
    .catch(err => res.json(err))

});

server.get('/api/users', protected, (req, res) => {
    db('users')
        .select('id', 'username', 'password')
        .then(users => {
            res.status(200).json({users})
        })
        .catch(err => res.send(err))
});

server.listen(3300, () => console.log('\nServer listening on port 3300\n'))
