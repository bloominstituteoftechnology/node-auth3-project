const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig.js');

const server = express();
const port = 9000;

server.use(express.json());
server.use(helmet());

// // Test:
// server.get('/', (req, res) => {
//     res.send('Its Alive!');
//   });

// Register - POST
server.post('/api/register', (req, res) => {
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 10)
    credentials.password = hash;

    db('users')
        .insert(credentials)
        .then(ids => {
            const id = ids[0];
            res.status(201).json({newUserId: id});
        })
        .catch(err => res.status(500).json(err));
});

// Login - POST
const jwtSecret = 'nadien.tira.un.enano!';
function generateToken(user) {
    const jwtPayload = {
        ...user, 
        hello: 'User',
        role: 'user',
    };
    const jwtOptions = {
        expiresIn: '5m',
    };
    
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
      .where({username: creds.username}) 
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(creds.password, user.password)) {
              const token = generateToken(user);
              res.status(200).json({welcome: user.username, token});
          }else {
              res.status(401).json({message: 'You Shall Not Pass!'})
          }
      })
      .catch(err => res.status(500).json(err));
});

//GET - Registered Users Only
function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: 'Invalid Token'});
            }else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    }else {
        res.status(401).json({message: 'No Token Provided'});
    };
};

server.get('/api/users', protected, (req, res) => {
    db('users')
        .select('id', 'username', 'department', 'password')
        .then(users => {
            res.status(200).json({users});
        })
        .catch(err => res.status(500).json(err));
});

server.listen(port, () => {
    console.log(`\n ===== Listening on Port ${port} =====\n`);
});
