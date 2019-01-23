const express = require('express');
const configMiddleware = require('../config/middleware');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');

const server = express();

const code = require('../common/errHandler.js');
const authHelper = require('../common/helpers');
configMiddleware(server);

server.get('/', (req, res) => {
   res.send('sanity check');
});

server.post('/register', (req, res) => {
   const userInfo = req.body;

   const hash = bcrypt.hashSync(userInfo.password, 12);

   userInfo.password = hash;

   db('users')
      .insert(userInfo)
      .then(ids => {
         res.status(code.accepted).json(ids);
      })
      .catch(err => res.status(code.intSerErr).json(err));
});

server.post('/login', (req, res) => {
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
               message: `welcome ${user.name}`,
               token,
            });
         } else {
            res.status(code.unauthorized).json({ you: 'shall not pass!!' });
         }
      })
      .catch(err => res.status(code.intSerErr).json(err));
});

// protect this endpoint so only logged in users can see it
server.get('/users', authHelper.protected, async (req, res) => {
   const users = await db('users').select(
      'id',
      'username',
      'name',
      'department'
   );

   res.status(code.okay).json({ users, decodedToken: req.decodedToken });
});

module.exports = server;
