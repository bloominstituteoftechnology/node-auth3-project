const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db_config = require('./knexfile');
const db = knex(db_config.development);

const server = express();
const PORT = 3300;

server.use(express.json());
server.use(cors());

function generateToken(user) { 
    const payload = {
        username: user.username,
        department: user.department
    };

    const secret = 'randomNumberGeneratorYesNoMaybe';

    const options = {
        expiresIn: '1h',
        jwtid: '98765'
    };

    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {

}

server.post('/api/register', (req, res) => {
    const user = req.body;
    if (user.username && user.password && user.department) {
        const hash = bcrypt.hashSync(user.password, 14);
        user.password = hash;
        db('users').insert(user)
        .then((ids) => {
            const id = ids[0];
            db('users').where({id}).first()
            .then((user) => {
                if(user) {
                    const token = generateToken(user); 
                    res.status(201).json({id: user.id, token});
                }
                else {

                }
            })
            .catch((error) => {
                res.status(500).send(`Server sent an error of: ${error}`);
            })
        })
        .catch((error) => {
            res.status(500).send(`Server sent an error of: ${error}`);
        })
    }
    else {
        res.status(400).json({message: 'Registering a user requires a username, password and department.'});
    }
})

server.post('/api/login', (req, res) => {
    const userFromBody = req.body;
    if (userFromBody.username && userFromBody.password) {
        dbhelpers.getUser(userFromBody.username)
        .then((user) => {
            if (user.length && 
                bcrypt.compareSync(userFromBody.password, user[0].password)) {
                    req.session.userID = user[0].id;
                    res.status(200).json({message: `User ${user[0].username} logged in...`});
                }
            else {
                res.status(403).json({message: 'Username or password not recognized.'});
            }
        })
        .catch((error) => {
            res.status(500).json({error: `Server sent an error of: ${error}`});
        })
    }
    else {
        res.status(400).json({message: 'Logging in requires both a username and password'});
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})