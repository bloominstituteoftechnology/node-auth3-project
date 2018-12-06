const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors()); 

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 14);

    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => json(err));

});

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)) {
        
            req.session.userId = user.id;
            res.status(200).json({message: `Welcome.`});
        
        } else {
            res.status(401).json({message: 'You shall not pass!'});
        }
    })
    .catch(err => res.json(err));
});

server.get('/api/users', (req, res) => {
    if (req.session && req.session.userId) {
        db('users')
        .select('id', 'username', 'password')
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
    } else {
        res.status(401).json({ message: 'You shall not pass!'});
    }
});

server.get('/', (req, res) => {
    res.send('Server is running');
});

server.listen(3300, () => console.log('Server is listening on port 3300.') );