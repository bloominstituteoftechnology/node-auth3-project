const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

const secret = 'cirmoscicahaj!';

function conjureToken(user) {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: '3h',
        jwtid: '222', // jti
        subject: `${user.id}`,
    };
    return jwt.sign(payload, secret, options);
}

function protector(req, res, next) {
    // read the token string from the Authorization header
    const token = req.headers.authorization;
    if (token) {
        // verify the token
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                // token is invalid
                res.status(401).json({ message: 'Invalid Token' });
            } else {
                // token is valid
                console.log(decodedToken);
                req.user = { username: decodedToken.username };
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'no token provided.' })
    }
}

// Endpoints 
server.get('/', (req, res) => {
    res.send('Server online, keep coding');
});

server.post('/api/register', (req, res) => {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 11);
    // replace user's password with the hash
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];

            db('users')
                .where({ id })
                .first()
                .then(user => {
                    const token = conjureToken(user);
                    res.status(201).json({ id: user.id, token });
                })
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
});

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = conjureToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'You shall not pass' });
            }
        })
        .catch(err => res.status(500).send(err));
});

server.get('/api/users', protector, (req, res) => {
    db('users')
        .select('id', 'username', 'password', 'department')
        .then(users => {
            res.json({ users }); // or res.json( users ) if using this.setState({ users: res.data.users }) in the users.js file
        })
        .catch(err => res.send(err));
});


server.listen(5500, () => console.log('\nrunning on port 5500\n'));