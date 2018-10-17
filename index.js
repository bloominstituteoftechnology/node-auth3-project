const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./db/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());

const jwtSecret= 'It is a party'

function generateToken(user) {
    const jwtPayload={
        username:user.username
    }
    
    

    const jwtOptions={
        expiresIn:'1h',
        
    }
    return jwt.sign(jwtPayload,jwtSecret,jwtOptions);
}

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.post('/register', (req, res) => {
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
   
    db('users')
        .insert(credentials)
        .then(ids => {
        const id = ids[0];
        res.status(201).json({ newUserId: id });
   })
   .catch(err => {
       res.status(500).json({err});
   })
})

server.post('/login', (req, res) => {
    const creds = req.body;
    db('users')
    .where({username: creds.username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ welcome: `${user.username}`, token });
        } else {
            res.status(401).json({ message: "You shall not pass!"});
        }
    })
    .catch(err => res.status(500).json({err}));
})

server.get('/users', protected, (req, res) => {
    db('users')
      .select('id', 'username', 'department')
      .then(users => {
        res.status(200).json({ users });
      })
      .catch(err => res.status(500).send(err));
});

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'invalid token!' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'no token provided' })
    }
    
}


server.listen(6000, () => console.log('\nrunning on port 6000\n'));