const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const knex = require('knex');
const dbconfig = require('./knexfile');
const db = knex(dbconfig.development);
const jwt = require('jsonwebtoken');
const secret = 'bigsecret';
const server = express();
const PORT = 4000;

createToken = (user) => {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: "5hr",
        jwtid: '123',
    }
    return jwt.sign(payload, secret, options);
}



server.disable("etag");
server.use(express.json());
server.use(helmet());
server.use(logger('dev'));


server.post('/api/register', (req, res) => {
    const newUser = req.body;
    if (!newUser.password || !newUser.username) {
        return res
            .status(412)
            .json('Please provide Username and/or password')
    }
    const protectedPassword = bcrypt.hashSync(newUser.password, 14);
    newUser.password = protectedPassword;
    db('users')
        .insert(newUser)
        .then(id => {
            res
                .status(201)
                .json(id)
        })
        .catch(err => {
            res
                .status(500)
                .json(err)
        })
})
server.post('/api/login', (req, res) => {
    const bodyUser = req.body;
    if (!bodyUser.password || !bodyUser.username) {
        return res
            .status(404)
            .json('Please provide Username and/or password')
    }
    db('users')
        .where({ username: bodyUser.username })
        .then(user => {
            if (user.length && bcrypt.compareSync(bodyUser.password, user[0].password)) {
                const token = createToken(user);
                res
                    .status(200)
                    .json({ id: user[0].id, token })
            } else {
                res
                    .status(401)
                    .json({ message: 'You shall not pass!' })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json(error)
        })
})

server.get('/api/users', (req, res) => {
    const token = req.headers.authorization;
    console.log(typeof token)
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            res
                .status(401)
                .send('Invalid Token');
        } else {
            db('users')
                .then(users => {
                    res
                        .json(users)
                })
                .catch(err => res.send(err));
        }
    })

});

server.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${PORT}`);
});