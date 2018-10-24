const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');



const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();



server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.send('***THIS SERVER IS RUNNING***')
});

server.post('/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    db('users')
    .insert(credentials)
    .then(ids => {
        const id = ids[0];
        res.status(201).json({ newUserId: id});
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

const jwtSecret = 'SECRET!!!';

function generateToken(user) {
    const jwtPayload = {
        ...user
    };
    const jwtOptions = {
        expiresIn: '1m'
    };
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};

server.post('/login', (req,res) => {
    const creds = req.body;
    db('users').where({username: creds.username}).first()
    .then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({welcome: user.username, token});
        } else {
            res.status(401).json({ message: 'you shall not pass!'});
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});



server.get('/users', protected, (req, res) => {
        db('users')
        .select('id', 'username', 'password')
        .then(users => {
            res.json({users});
        })
        .catch(err => res.send(err));
    
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
        });
    } else {
        res.status(401).json({ message: 'no token provided'});
    }
}


const port = 5000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});