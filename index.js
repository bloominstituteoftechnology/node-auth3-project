const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./data/dbConfig');

const server = express();
const PORT = 4200;

const secret = "SuperCaliFragilisticExpialadocious8675309"; //heh, two fun old references here! :-)

function protect(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res
                    .status(401)
                    .json({ message: "nope" });
            } else {
                next();
            }
        });
    } else {
        res
            .status(401)
            .json({ message: "no token?" });
    }
}

function makeToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: "42mins",
        jwtid: "8675309"
    };
    return jwt.sign(payload, secret, options);
}

server.use(express.json())

server.get('/', (req, res) => {
    res.send("it works!");
});

server.post('/api/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    db("users")
        .insert(user)
        .then(ids => {
            const id = ids[0];
            db("users")
                .where({ id })
                .first()
                .then(user => {
                    const token = makeToken(user);
                    res
                        .status(201)
                        .json({ id: user.id, token });
        });
    })
    .catch(err => {
        res
            .status(500)
            .json(err);
    });
})

server.post('/api/login', (req, res) => {
    const credentials = req.body;
    db("users")
        .where({ username: credentials.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = makeToken(user);
                res
                    .status(200)
                    .json({ message: "You made it!", token });
            } else {
                res
                    .status(401)
                    .json({ message: "You shall not pass!" });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err });
        });
})

server.get('/api/users', (req, res) => {
    db("users")
        .select("id", "username")
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.send(err);
        });
})

server.listen(PORT, () => {
    console.log(`working so far, on port ${PORT}`);
});