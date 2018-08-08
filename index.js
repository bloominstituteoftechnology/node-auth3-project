const express = require('express');

const db = require('./data/db.js');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const secret = 'this is a token foo';

function protected(req, res, next) {
    const token = req.headers.authurization;
    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res
                    .status(401)
                    .json({error:'you shall not pass!! - token invalid'});
            }
            req.jwtToken = decodedToken;
            next();
        });
    } else {
        return res.status(401).json({error:'you shall not pass!! - no token'});
    }
}

function generateToken(user) {
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: '1h',
        jwtid:'8728391'
    };
    return jwt.sign(payload, secret, options);
}

const server = express();

server.use(express.json());

///endpoints go here


server.get('/', (req, res) => {
    db('users')
        .then(proj => res.status(200).json(proj))
        .catch(err => res.status(500).json({error:'These are not the projects you are looking for'})
    )
})

server.post('/api/register', (req, res) => {
    const register = req.body;
    const hash = bcrypt.hashSync(register.password, 14);
    register.password = hash;
    if (!register.username || !register.password)
    res.status(400).json({errorMessage:"Required username and password"});
    db('users')
        .insert(register)
        .then(user => {
            const token = generateToken(user);
        
            res.status(201).json(token)
        })
        .catch(err => res.status(400).json({error: 'Error posting'}))
})

server.post('/api/login', function(req, res) {
    const credentials = req.body;

    db('users')
        .where({username: credentials.username })
        .first()
        .then(function(user) {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                // req.session.username = user.username;
                // res.send(`Hello ${user.username}`);
                const token = generateToken(user);
                res.send(token);
            } else{ 
                return res.status(401).json({ error: 'Incorrect credentials' });
            }
        })
        .catch(function(error) {
            res.status(500).json({ error });
        })
})

server.get('/api/users', protected, (req, res) => {
    console.log('token', req.jwtToken);
    db('users')
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
    });

server.get('/api/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.send('error logging out');
            } else {
                res.send('good bye');
            }
        })
    }
})

const port = 3300;
server.listen(port, function() {
 console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
