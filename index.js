const express = require('express');
const server = express();
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PORT = 9876;

const db = require('./database/dbHelpers');

// middleware goes here

server.use(express.json());
server.use(cors());
server.use(session({
    // configure express-session middleware
      name: 'notsession', // default is connect.sid
      secret: 'help will always be given at Hogwarts to those who ask for it.',
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
      }, // 1 day in milliseconds
      httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
      resave: false,
      saveUninitialized: false,
  }))

server.get('/', (req, res) => {
    res.send(`Hello, world!!`);
})

server.post('/api/register', (req, res) => {
    const user = req.body;
    console.log(`session`, req.session)
    user.password = bcrypt.hashSync(user.password, 14)
    db.insert(user)
    .then(ids => {
        res.status(201).json({id: ids[0]})
    })
    .catch(error => {
        res.status(500).send(`Nope, wrong`)
    })
})

server.post('/api/login', (req, res) => {
    const userBody = req.body;
    db.findByUsername(userBody.username)
    .then(users => {
        console.log(`just logged in:`, users)
        if(users.length && bcrypt.compareSync(userBody.password, users[0].password)){
            req.session.userId = users[0].id
            res.json(`Correct`)
        } else {
            res.status(404).json(`You shall not pass!`)
        }
    })
    .catch(err => {res.status(500).send(err)})
})

server.get('/api/users', (req, res) => {
    // protected middleware function before req, res
    if(req.session && req.session.userId){
        db.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => res.send(`You shall not pass!`))
    } else {
        res.status(400).send(`access denied`)
        // source of error code
    }
})

server.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if(err){
            res.status(500).send('failed to log you out')
        } else {
            res.status(201).send('logged you out. be seeing ya!')
        }
    })
})

server.listen(PORT, () => {console.log(`Hello, world from port ${PORT}!`)})