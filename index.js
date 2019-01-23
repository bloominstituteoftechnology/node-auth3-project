const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const db = require('./database/dbHelpers.js');

const server = express();

// Custome Middleware

function generateToken() {
    const payload = {
        username: user.username
    };
    const secret = 'youwontguessit';
    const options = {
        experesIn: '1h',
        jwtid: '12345'
    }
    return jwt.sign(payload, secret, options)
}

server.post('/api/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);
    db.insert(user)
      .then(ids => {
          res.status(201).json({id: ids[0]});
          db('users')
            .where({id})
            .first()
            .then(user => {
                const token = generateToken(user);
                res.status(201).json({id: user.id, token});
            })
            .catch(err => res.status(500).send(err));
      })
      .catch(err => { res.status(500).send(err)});
});