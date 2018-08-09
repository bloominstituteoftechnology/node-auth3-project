const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const port = 8002;

const db = require('./data/db');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000", credentials:true }));

server.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})


const secret = 'nobody tosses a dwarf!!';

function generateToken(user) {
    const payload = {
        username: user.username,
    }

    const options = {
        expiresIn: '1h',
        jwtid: '2345678'
    };

    return jwt.sign(payload, secret, options)
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({ error: 'You shall not pass! - invalid token'})
            }

            req.jwtToken = decodedToken;
            next();
        })
    } else {
        return res.status(401).json({ error: 'You shall not pass! - no token'})
    }
}

// function checkNamePass(req, res, next) {
//     const { username, password } = req.body;

//     if(!username || !password) {
//         return res.status(400).json({ error: 'Please provide both a username and password' })
//         next()
//     }
// }

// **** user *****

server.post('/api/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

   
    db('users')
        .insert(user)
        .then(ids => {
            db('users')
            .where({ id: ids[0] }) // grabbing the first from the array
            .first() // same o
            .then(user => {
                const token = generateToken(user);
                res.status(201).json({ username: user.username, token});
            })
        })
        .catch(err => res.status(500).json({ err }))

})

server.post('/api/login', (req, res) => {
    const credentials = req.body;

    db('users')
        .where({ username: credentials.username })
        .first()
        .then(user => {
            if( user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = generateToken(user);
                res.status(200).send(token)
            } else {
                return res.status(401).json({ err: 'Incorrect credentials'})
            }
        })
        .catch(err => res.status(500).json(err))
})

server.get('/users', protected, (req, res) => {
    console.log('token: ', req.jwtToken)
    db('users')
    .select('id', 'username')
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err))
})

// server.get('/logout', (req, res) => {
//     if (token) {
//         token.destroy(err => {
//             if(err) {
//                 res.send('error logging out');
//             } else {
//                 res.send('good bye');
//             }
//         })
//     }
// })


server.listen(port, () => console.log(`running on port ${port}`));