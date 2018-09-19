// Requirements
const knex = require('knex');
const express = require('express');
const bcrypt = require('bcryptjs');
const knexConfig = require('./knexfile');
const session = require('express-session');
const cors = require('cors');
const KnexSessionStore = require('connect-session-knex')(session);

// Instantiations
const server = express();
const db = knex(knexConfig.development);

// Middleware


const sessionConfig = {
    name: 'lovebird', // default is connect.sid
    secret: 'lovey lovebirds!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false, // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        tablename: 'sessions',
        sidfieldname: 'sid',
        knex: db,
        createtable: true,
        clearInterval: 1000 * 60 * 60,
    })
};


server.use(session(sessionConfig));
server.use(express.json());
server.use(cors());

function restricted(req, res, next) {
    if (req.session && req.session.username) {
        next();
    } else {
        res.status(401).json({ message: 'You shall not pass!!' });
    }
}

// Endpoints
// server.get('/', (req, res) => {
//     res.status(200).send('Server is running!');
// });

server.get('/', (req, res) => {
    req.session.name = 'auth ii project';
    res.send('doing the thing');
});

server.post('/api/register', (req, res) => {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 8);

    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];

            res.status(201).json(id);
        })
        .catch(err => {
            console.log('/api/register POST error:', err);
            res.status(500).send('Please try again later');
        });
});

server.get('/api/users', restricted, (req, res) => {
    
    if(req.session && req.session.username){

    
        db('users').select('id', 'username', 'password', 'department').then(users => {
            res.status(201).json(users);
        }).catch(err => {
            console.log("error:", err);
            res.status(500).json(err);
        })
    
        }else {
    
        res.status(401).json({message: 'Not authorized'});
        }

    
});

server.post('/api/login', (req, res) => {
    //grab creds
    const creds = req.body;

    //find the user
    db('users')
    .where({username: creds.username})
    .first()
    .then(user => {
        //check creds
        if (user && bcrypt.compareSync(creds.password, user.password)){
            req.session.username = user.username;
            res.status(200).send(`Welcome ${req.session.username}`);
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