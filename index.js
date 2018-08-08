const express = require('express');
const db = require('./data/db');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const server = express();

server.use(express.json());

server.use(
    session({
      name: 'notsession', // default is connect.sid
      secret: 'secret',
      cookie: { maxAge:  60 * 60 * 1000 }, // 1 day in milliseconds
      httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
      secure: true, // only set cookies over https. Server will not send back a cookie over http.
      resave: false,
      saveUninitialized: false,
    })
);

server.post('/api/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;

    db.insert(credentials)
        .into('users')
        .then(ids => {
            db('users')
                .where({ id: ids[0] })
                .first()
                .then(user => {
                    res.status(201).json(user);
                })

        })
        .catch(err => {
            res.status(500).json(err);
        })
});

server.post('/api/login', (req, res) => {
    const credentials = req.body;


    db('users')
        .where({ username: credentials.username }).first()
        .then(user => {
            if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
                return res.status(401).json({ error: 'You shall not pass!' });
            }
            else {
                req.session.username = user.username;
                res.status(201).json({ message: 'Logged in' });
            }
        })
    .catch(err => {
        res.status(500).json(err);
    })

})

server.get('/api/users', (req,res) => {
    if(req.session && req.session.username === 'Desco'){
    db.select()
        .from('users')
        .then(users => {
            res.status(201).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
    else
    return res.status(401).json({ error: 'You shall not pass!' });
})

const port = 8000;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});