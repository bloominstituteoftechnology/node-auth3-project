const express = require('express');
const configMiddleware = require('../config/middleware');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');

const server = express();

const code = require('../common/errHandler.js');
const authHelper = require('../common/helpers');
configMiddleware(server);

// Register
server.post('/api/register', (req, res) => {
   const userInfo = req.body;

   const hash = bcrypt.hashSync(userInfo.password, 12);

   userInfo.password = hash;

   db('users')
      .insert(userInfo)
      .then(ids => {
         const token = authHelper.generateToken(userInfo);
         res.status(code.accepted).json({
            ids,
            token,
         });
      })
      .catch(err => res.status(code.intServErr).json(err));
});

// Login
server.post('/api/login', (req, res) => {
   const creds = req.body;

   db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
         if (user && bcrypt.compareSync(creds.password, user.password)) {
            // login successful
            // create web token
            const token = authHelper.generateToken(user);

            res.status(code.okay).json({
               message: `Welcome back ${user.name}!`,
               token,
            });
         } else {
            res.status(code.unauthorized).json({
               message: 'You shall not pass!!',
            });
         }
      })
      .catch(err => res.status(code.intSerErr).json(err));
});

// Get list of users
// protect this endpoint so only logged in users can see it
server.get('/api/users', authHelper.protected, async (req, res) => {
   const users = await db('users')
      .select('id', 'username', 'name', 'department')
      .where({ department: req.decodedToken.department });

   res.status(code.okay).json({ users, decodedToken: req.decodedToken });
});

module.exports = server;
