require('dotenv').config();

const express = require('express');
const cors = require ('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(cors());

const port = 9000;
const rounds = 14;

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: "1h"
    };

    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Invalid token" });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "No token provided" });
    }
}

server.post("/api/register", (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, rounds);
    creds.password = hash;

    db("users")
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user) {
                res.status(409).json({ message: "Username in use." });
            } else {
                db("users")
                    .insert(creds)
                    .then(ids => {
                        res.status(201).json(ids);
                    })
                    .catch(err => {
                        res.status(500).json({ error: err });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

server.post("/api/login", (req, res) => {
    const creds = req.body;

    db("users")
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: "Welcome!", token });
            } else {
                res.status(401).json({ message: "You shall not pass!" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

server.get("/api/users", protected, (req, res) => {
    db("users")
        .select('id', 'username', 'password', 'department')
        .where({ department: req.decodedToken.department })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: "Here", err });
        });
});

server.get("/", (req, res) => {
    res.send("We are live!");
});

server.listen(port, () => console.log(`\nRunning on port ${port}\n`));
