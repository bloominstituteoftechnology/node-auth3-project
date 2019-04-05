const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');
const Users = require('../api/users-model.js');
const db = require("../database/dbConfig.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({origin: true, credentials: true}));

// Function that generates token
function generateToken(user) {
  const payload = { 
    subject: user.id,
    username: user.username,
    roles: ["IT"]
  };
  const secret = 'the secret';
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options)
}


// Middleware to restrict access
function restricted(req, res, next) {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Invalid token" });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  }

  // Allow access to the specific group 
function checkRole(role) {
  // Middleware to check if user is a certain type
  return function(req, res, next) {
    if (req.decodedJwt.roles && req.decodedJwt.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ message: "You do not have access to this data." });
    }
  };
} 


// *** End Poiints ***
  server.post('/api/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 4); // 2 ^ n
    user.password = hash;
   // console.log(user)
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  server.post('/api/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  server.get("/api/users", restricted, checkRole("IT"), async (req, res) => {
    const creds = req.decodedJwt;
    //console.log('First console!:',req.decodedJwt)
    //console.log('My creds are currently:', creds)
    const user = await db("users")
      .where({ username: creds.username })
      .first();
    //console.log("I finished getting users from the database", user)
    if (user) {
      console.log("I've made it into the ad block")
      const users = await db("users")
        //.where({ department: user.department})
        .select("id", "username");
       //console.log("I got users back from the database here:", users);
      res
        .status(200)
        .json({
          message: "Users retrived successfully from the database.",
          users
        });
    } else {
      res
        .status(404)
        .json({ message: "There are no other users in that department." });
    }
  });  

module.exports = server;
