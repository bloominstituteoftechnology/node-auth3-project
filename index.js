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
      res.status(401).json({ message: 'token not found' });
    }
}

const generateToken = (user) => {
    const payload = {
      subject: user.id,
      username: user.username,
      role: user.department,
    };
  
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: '1h',
    };
  
    return jwt.sign(payload, secret, options);
}

server.get("/api/users", protected, (req, res) => {
    db("users")
        .where({ department: req.decodedToken.role })
        .select("id", "username", "password", "department")
        .then(users => res.status(200).json(users))
        .catch(err => res.status(401).json(err))
})

server.post("/api/register", (req, res) => {
    const creds = req.body;

    if (creds.username === "" || creds.username === undefined) {
        return res.status(400).json({error: "Please enter a username."})
    }

    if (creds.password === "" || creds.password === undefined) {
        return res.status(400).json({error: "Please enter a password."})
    }

    if (creds.department === "" || creds.department === undefined) {
        return res.status(400).json({error: "Please enter a department."})
    }

    const hash = bcrypt.hashSync(creds.password, 8);
    creds.password = hash;

    db("users")
        .insert(creds)
        .then(ids => res.status(201).json(ids))
        .catch(err => res.status(401).json(err))
})

server.post('/api/login', (req, res) => {
    const creds = req.body;

    if (creds.username === "" || creds.username === undefined) {
        return res.status(400).json({error: "Please enter a username."})
    }

    if (creds.password === "" || creds.password === undefined) {
        return res.status(400).json({error: "Please enter a password."})
    }
  
    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: 'welcome!', token });
        } else {
          res.status(401).json({ message: 'you shall not pass!!' });
        }
      })
      .catch(err => res.json(err));
  });

server.get("/", (req, res) => {
    res.status(200).json({api: "running"});
})

const port = 9001;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});