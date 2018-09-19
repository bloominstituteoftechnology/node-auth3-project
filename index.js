const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile.js')
const bcrypt = require('bcryptjs');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = knex(knexConfig.development);
const server = express();
const jwt = require('jsonwebtoken')
server.use(express.json());
server.use(cors());

function generateToken(user) {
    const payload = {
        username: user.username
    }
    const secret = 'itsasecret';

    const options = {
        expiresIn: '1h',
        jwtid: '56789',
    };

    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    if (payload.username && user.username) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

// endpoints

server.get("/api/users", protected, (req, res) => {
    db("users")
      .select()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.status(500).json(err));
  });
  
  server.post("/api/register", (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 4);
    creds.password = hash;
  
    db("users")
      .insert(creds)
      .then(ids => {
        const id = ids[0];
        res.status(201).json(id);
      })
      .catch(err => res.status(500).send(err));
  });
  
  server.post("/api/login", (req, res) => {
    const creds = req.body;
    db("users")
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          generateToken(user.username)
          res.status(200).send(`Welcome, ${user.username}`);
        } else {
          res.status(401).json({ message: "Username or password is incorrect" });
        }
      });
  });
  
  //server listen
  server.listen(3300, () => console.log("\nrunning on port 3300\n"));