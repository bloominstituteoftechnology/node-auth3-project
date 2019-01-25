require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const jwt = require('jsonwebtoken');

const { db, insert, findByUsername, getUsers }= require('./dbHelpers.js');

const server = express();

//this step is critical to post requests
//the json that is needed to post
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('api working')
});


server.post('/api/register', (req, res) => {
    const user = req.body;
    //Hashes the password input
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;
    insert(user)
    .then(u => {
        res.status(200).json({ id: u[0] })
    })
    .catch(err => res.status(500).json(err))
});

function generateToken(user) {
    const payload = {
        username: user.username,
        roles: ['admin', 'accountant']
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '10m'
    };

    return jwt.sign(payload, secret, options);
}

server.post('/api/login', (req, res) => {
    //check that username exists AND passwords match
    const userInput = req.body;
    findByUsername(userInput.username)
    .then(user => {
        //username valid password from client == password from db
        if(user && bcrypt.compareSync(userInput.password, user[0].password)){


            const token = generateToken(user);

            res.status(200).json({ message: `wecome`, token });
        } else {
            res.status(404).json({err: 'invalid username or password'})
        }
    })
    .catch(err => {
        res.status(500).send(err);
    })
});

function lock(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'invalid token' })
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'no token provided' });
    }
}

// function checkRole(role) {
//     return function(req, res, next) {
//         if (req.decodedToken.roles.includes(role)) {
//             next();
//         } else {
//             res.status(403).json({ message: `you need to be an ${role}` });
//         }
//     }
// }

//protect this endpoint so only logged in users can see it
server.get('/users', lock, (req, res) => {
    getUsers()
    .then(u => {
        res.status(200).json({
            u,
            decodedToken: req.decodedToken})
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

// server.get('/logout', (req, res) => {
//     if (req.session) {
//       req.session.destroy(err => {
//         if (err) {
//           res.send('error logging out');
//         } else {
//           res.send('good bye');
//         }
//       });
//     }
//   });

const port = process.env.PORT || 3300;
server.listen(port, function(){
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
})
