const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const session = require('express-session');

const db = require('./database/dbHelpers.js');

const server = express();
const port = 2222;

server.use(cors());
server.use(express.json());
server.use(session({
    name: 'notsession',
    secret: 'qweruiopasdfjkl;zxcvm,./',
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day IN MILLISECONDS
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
}));

server.post('/api/register', (req, res) => {
    const user = req.body;
    user.password = bcryptjs.hashSync(user.password, 16);
    db.insert(req.body)
        .then(response => {
            // console.log(req.body);
            res.status(201).json(`User ${req.body.username} was created in the ${req.body.department} department!`);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({err: 'Problem creating your account. Please try again.'});
        });
});
server.post('/api/login', (req, res) => {
    db.findByUser(req.body.username)
        .then(response => {
            // console.log(req.body);
            // console.log(response);
            // console.log(req.session);
            if((req.body.username === response[0].username) && bcryptjs.compareSync(req.body.password, response[0].password)){
                req.session.userID = response[0].id;
                res.status(200).json(`Hello ${req.body.username}. You have successfully logged in!`);
            } else {
                res.status(404).json({err: "invalid username OR password. please try again."})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({err: error});
        });
});

server.get('/api/users', (req, res) => {
    if(req.session && req.session.userID) {
        db.selectAllUsers()
            .then(response => {
                res.status(200).json({UserInfo: response});
            })
            .catch(error => {
                console.log(error);
                res.json({err: 'unable to load userinfo. please try again.'});
            });
    } else {
        res.status(400).json({err: 'ACCESS DENIED! Please login first'})
    }
});

server.listen(port, () => console.log(`Server up and running @ Port ${port}!`));