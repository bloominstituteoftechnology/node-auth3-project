// Requirements
const knex = require('knex');
const express = require('express');
const bcrypt = require('bcryptjs');
const knexConfig = require('./knexfile');
const cors = require('cors');

//change to token
const jwt = require('jsonwebtoken');

// Instantiations
const server = express();
const db = knex(knexConfig.development);

// Middleware

//change to token
const secret = "lovey lovebirds"
   function generateToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345',
    }
    return jwt.sign(payload, secret, options)
}


server.use(express.json());

server.use(cors());



function restricted(req, res, next) {

    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: "token invalid"})
            } else {
                req.user = {username: decodedToken.username};
                next();
        }
    })
    } else {
    res.status(401).json({message: "no token"})
    }
}

// Endpoints
// server.get('/', (req, res) => {
//     res.status(200).send('Server is running!');
// });

server.get('/', (req, res) => {
    req.token.name = 'auth ii project';
    res.send('doing the thing');
});




server.post('/api/register', (req, res) => {
    //3 steps to hash
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 8);
    creds.password = hash;


    //
    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];
            const token = generateToken(creds);
            res.status(201).json({ token, id });
        })
        .catch(err => {
            console.log('/api/register POST error:', err);
            res.status(500).send('Please try again later');
        });
});

server.get('/api/users', restricted, (req, res) => {
    
        db('users').select('id', 'username', 'password', 'department').then(users => {
            res.status(201).json(users);
        }).catch(err => {
            console.log("error:", err);
            res.status(500).json(err);
        })
    
});

server.post('/api/login', (req, res) => {
    //grab creds / verify password
    const creds = req.body;

    //find the user
    db('users')
    .where({username: creds.username})
    .first()
    .then(user => { 
        //check creds
        if (user && bcrypt.compareSync(creds.password, user.password)){
            const token = generateToken(user);
            res.status(200).json({ token });
        } else {
            res.status(401).json({message: 'You shall not pass!'});
        }
    }).catch(err => {
        console.log('/api/login Post error:', err);
        res.status(500).send(err, "Everything failed")});
});



// Other Settings


const PORT = 1111;

server.listen(PORT, () => console.log(`Server running on ${PORT}!`));