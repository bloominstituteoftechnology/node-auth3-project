require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const knex = require("knex");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

const protected = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'invalid token' });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ message: 'not token provided' });
    }
}

server.post("/api/register", (req, res) => {
    const creds = req.body;

    if (creds.username === "" || creds.username === undefined) {
        return res.status(400).json({error: "Please enter a username."})
    }

    if (creds.password === "" || creds.password === undefined) {
        return res.status(400).json({error: "Please enter a password."})
    }

    const hash = bcrypt.hashSync(creds.password, 8);
    creds.password = hash;
    
    db("users")
        .insert(creds)
        .then(ids => res.status(201).json(ids))
        .catch(err => res.status(401).json(err))
})

server.get("/", (req, res) => {
    res.status(200).json({api: "running"});
})

const port = 9001;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});