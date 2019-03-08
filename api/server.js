//require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'testlll';

const knexConfig = require('../knexfile.js');

const server = express();

const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());
server.use(cors({origin: true, credentials: true}));

function generateToken(user){
    const payload = {
        name: user.username,
        roles: "test",
        id: user.id
    }



 const options = {
    expiresIn: '60m'
 }

 return jwt.sign(payload, secret, options)
}

function restricted(req, res, next) {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
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
    const userInfo = req.body;
  
    const hash = bcrypt.hashSync(userInfo.password, 12);
  
    userInfo.password = hash;
  
    db("users")
      .insert(userInfo)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json({
          error: "Error registering user to the database."
        });
      });
  });

  server.post("/api/login", (req, res) => {
    const {username, password} = req.body;
  
    db("users")
      .where({ username })
      
      .first()
      .then(user => {
        console.log(user, password)
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `Welcome ${user.username}`, token });
        } else {
          res.status(401).json({ message: "You shall not pass!!" });
        }
      })
      .catch(err => res.status(500).json({ message: "Error logging in." }));
  });

  server.get('/api/users', restricted, (req, res) => {
    db("users")
      .select('id', 'username', 'password', 'department')
      .then(users => {
        if (users) {
          res.status(200).json(users);
        } else {
          res.status(401).json({ message: 'You shall not pass!' });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: 'User information could not be retrieved.' })
      );
  });






module.exports = server;