// dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
// databse
const db = require('./data/dbConfig.js');
// express
const server = express();
// middleware
server.use(express.json());
// endpoints
server.post('/api/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;

    db('users')
        .insert(credentials)
            .then(ids => {
                const id = ids[0];
                console.log('from', id);
                res.status(200).json({ newUserId: id });
            })
            .catch(err => {
                console.log('register post error');
                res.status(500).json(err);
            });
});

server.get('/api/users', (req, res) => {
    db('users')
        .select('id', 'username', 'password', 'department')
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(200).json(err);
            });
});

// port
const port = 7000;
server.listen(port, () => console.log(`___ server listening at localhost ${port} ___`));