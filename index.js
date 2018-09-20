const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./dbAccess');

const server = express();

const secret = "Product-placement is what separates us from the animals."

server.use(express.json());
server.use(cors());

function generateToken(user) {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345',
    };
    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'Invalid Token' });
            } else {
                console.log(decodedToken);
                req.user = {username: decodedToken.username};
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
}

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];
            
            db('users')
                .where({ id })
                .first()
                .then(user => {
                    const token = generateToken(user);
                    res.status(201).json({ id: user.id, token });
                })
                .catch(err => {
                    console.log('/api/register POST error:', err);
                    res.status(500).send('Please try again later.');
                });
        })
        .catch(err => {
            console.log('/api/register POST error:', err);
            res.status(500).send('Please try again later.');
        });        
});

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password )) {
                const token = generateToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        })
        .catch(err => {
            console.log('/api/login POST error:', err);
            res.status(500).send('Please try again later.');
        });
});

server.get('/api/users', protected, (req, res) => {
    db('users')
        .select('id', 'username', 'password')
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log('/api/users GET error:', err);
            res.status(500).send('Please try again later.');
        });
});

server.listen(9000, () => console.log('\n== API on port 9k ==\n'));