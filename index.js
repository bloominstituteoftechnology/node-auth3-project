const express = require('express');
const server = express();
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const PORT = 9876;

const db = require('./database/dbHelpers');

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
        if(users.length && bcrypt.compareSync(userBody.password, users[0].password)){
            res.session.userId = users[0].id;
            res.json(`Correct`)
        } else {
            res.status(404).json(`You shall not pass`)
        }
    })
    .catch(err => {res.status(500).send(err)})
})



server.listen(PORT, () => {console.log(`Hello, world from port ${PORT}!`)})