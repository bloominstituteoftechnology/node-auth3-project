const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const db = require('./data/dbHelpers.js');

const server = express();

const secret = 'IHazASecret';
const PORT = 4500;
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

function generateToken(user) {
    const payload = {
        username: user.username,
    };

    const options = {
        expiresIn: '10h',
        jwtid: '7562248',
    };
    return jwt.sign(payload, secret, options);
};

function protectThis (req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ errorMessage: 'Invalid Token' });
            }
            else {
                req.username = decodedToken.username;
                next();
            }
        });
    }
    else {
        res.status(401).json({ errorMessage: 'No Token Provided.' });
    }
};

server.post('/api/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 14);
    const token = generateToken(user)
    db.insert(user)
      .then(ids => {
          res.status(201).json({ id: ids[0], token });
        })
      .catch(err => {
        res.status(500).json({ errorMessage: 'Failed to create user.' });
      });
  });

server.post('/api/login', (req, res) => {
    const credentials = req.body;
    db.findByUsername(credentials.username)
    .then(users => {
        if (users && bcrypt.compareSync(credentials.password, users[0].password)) {
            const token = generateToken(users)
            res.status(200).json({ users, token });
        }
        else {
            res.status(404).json({ errorMessage: 'Invalid username or password.' });
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Failed to login.' });
    });
});

// server.get('/api/users', protectThis, (req, res) => {
//     next();
// });

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});