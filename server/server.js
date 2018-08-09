const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const db = require('./data/db');

const server = express();

server.use(express.json());
server.use(cors());

const secret = 'nobody tosses a dwarf'

function protected(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res 
                    .status(401)
                    .json({ error: 'You shall not pass!! - token invalid' });
            }
            req.jwtToken = decodedToken;
            next();
        });
    } else {
        return res.status(401).json({ error: 'you shall not pass!! - no token' });
    }
}

function generateToken(user) {
    const payload = {
      username: user.username,
    };
  
    const options = {
      expiresIn: '1h',
      jwtid: '8764691',
    };
  
    return jwt.sign(payload, secret, options);
}

server.post('/api/register', function(req, res) {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash; 
    db('users')
        .insert(user)
        .then(response => {
            const id = response[0];
            db('users')
                .where({ id })
                .first()
                .then(user => {
                    const token = generateToken(user);
                    res.status(201).json(token);
                });
        })
        .catch(err => {
            res.status(500)
            .send(`${err}`);
        });       
});

server.post('/api/login', function(req,res) {
    const credentials = req.body;
    db('users')
        .where({ username: credentials.username })
        .first()
        .then(function(user) {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = generateToken(user);
                res.send(token);
            } else {
                return res.status(401).json({ error: 'Incorrect credentials' });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        })
})

server.get('/api/users', protected, (req, res) => {
    db('users')
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

const port = 8000;
server.listen(port, () => console.log(`\n=== API running on ${port} ===\n`)); 