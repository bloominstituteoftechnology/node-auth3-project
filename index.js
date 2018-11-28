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



server.get("/", (req, res) => {
    res.send("We are live!");
});

server.listen(port, () => console.log(`\nRunning on port ${port}\n`));
