const express = require('express');
const cors = require('cors');

const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig.js');

const server = express();

const jwt = require('jsonwebtoken');

server.use(express.json());
server.use(cors());

// sanity check
server.get('/', (req, res) => {
    res.send("It's allliiiiive!!");
});

server.get('/api/users', protected, (req, res) => {
    console.log('\n*** decoded token information***\n', req.decodedToken);
    db('users')
      .select('id', 'username', 'department')
      .then(users => {
        res.status(200).json({ users });
      })
      .catch(err => res.status(500).send(err));
  });

server.post('/api/register', (req, res) => {
    const credentials = req.body;

    // hash password
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    // save user
    db('users').insert(credentials).then(ids => {
        const id = ids[0];
        const token = generateToken({ username: credentials.username })
        res.status(201).json({ newUserId: id, token });
    })
    .catch(err => {
        res.status(500).json({err});
    })
})

server.post('/api/login', (req, res) => {
    const creds = req.body;

    db('users')
    .where({username: creds.username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: `Logged in as ${user.username}`, token });
        } else {
            res.status(401).json({ message: "You shall not pass!"});
        }
    })
    .catch(err => res.status(500).json({err}));
})

// server.get('/api/logout', protected, (req, res) => {
//     if (req.session) {
//         req.session.destroy(err => {
//             if (err) {
//                 res.send("I'm sorry, I'm afraid I can't let you do that")
//             } else {
//                 res.send('Signing off...');
//             }
//         });
//     }
// });

const jwtSecret = 'nobody tosses a dwarf!';
function generateToken(user) {

    const jwtPayload = {
        ...user,
        hello: 'FSW13',
        role: 'admin'
    };


    const jwtOptions = {
        expiresIn: '1h',
        
    }

    return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
}

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

const port = 8989;
server.listen(port, () => console.log(`***API running on ${port}***`))