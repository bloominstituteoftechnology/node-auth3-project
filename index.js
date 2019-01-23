const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user){
    const payload = {   // no sensitive passwords here
        username: user.username,
        department: user.department,
    };

    const secret = 'backtothefuture';

    const options = {
        expiresIn: '1h',
        jwtid: '12345' //jti
    }

    return jwt.sign(payload, secret, options); // anatomy of JSON webtoken
}

function protect(req, res, next){
    // use jwts instead of sessions
    next();
}


server.post('/api/register', (req, res) => {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 10); //override original password to hash
    creds.password = hash;
    //let id = '';

    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];

        //find user using id
        db('users')
            .where({id})
            .first()
            .then(user => {
                const token = generateToken(user);
                res.status(201).json({ id: user.id, token });
            })
            .catch(err => res.status(500).send(err));
    })
    .catch(err => {
        res.status(500).send(err);
    });
});

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        //.first()
        .then(users => {
            if(users.length && bcrypt.compareSync(creds.password, users[0].password)) {
                res.status(200).send(`Welcome ${creds.username}`);
            } else {
                res.status(404).json({ err: "invalid username or password"});
            }
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

server.get('/api/users', protect, (req, res) => {
    db('users').select('id', 'username', 'password')
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).send(err);
    })
})




server.get('/', (req , res) => {
    res.send('JSON Web Token Session Starting...');
});

server.listen(3500, () => console.log('\nrunning on port 3500\n'));