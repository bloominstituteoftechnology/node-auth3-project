const express = require('express');
const server = express();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const cors = require('cors');
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

function protected() {

}

function generateToken() {
    const payload = {
        username: user.username,
    }
    const secret = 'seeeeecret!';
    const options = {
        expiresIn: '1h',
        jwtid: '12345' // aka jti
    }
    return jwt.sign(payload, secret, options)
}

server.post('/api/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash;
    
    db.insert(user)
    .then(ids => {
        const id = ids[0];
        // generate a token
        generateToken(user);

        //attach that token to the response
        res.json(201).json(id)
    })
    .catch(error => {res.status(500).send(err)})
})

server.post('/api/login', (req, res) => {
    const userBody = req.body;
    db.findByUsername(userBody.username)
    .first()
    .then(users => {
        if(user && bcrypt.compareSync(userBody.password, user.password)){
            // generate a token

            // attach that token to the response
            res.status(200).send(`Welcome, ${user.username}`)
        } else {
            res.status(404).json(`You shall not pass!`)
        }
    })
    .catch(err => {res.status(500).send(err)})
})

server.get('/api/users', protected, (req, res) => {

})


// server.get('/api/users', (req, res) => {
//     // protected middleware function before req, res
//     if(req.session && req.session.userId){
//         db.get()
//         .then(users => {
//             res.json(users)
//         })
//         .catch(err => res.send(`You shall not pass!`))
//     } else {
//         res.status(400).send(`access denied`)
//         // source of error code
//     }
// })

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