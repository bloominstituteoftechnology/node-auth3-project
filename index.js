const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

const port = 9000;

server.use(cors());
server.use(morgan('combined'));
server.use(express.json());


const secret = 'high fiving a million angels';

function restricted(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secret, (err, decodedToken)=> {
            if(err) {
                res.status(401).json({message: "Invalid token"});
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({message: "No token provided"});
    }
};

function generateToken(user) {
    const payload = {
        ...user
    };
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, secret, options);
}

server.post('/register', (req, res) => {
    const credentials = req.body;
   ​
    const hash = bcrypt.hashSync(credentials.password, 10);
    credentials.password = hash;
   ​
    db('users')
     .insert(credentials)
     .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id });
     })
     .catch(err => {
      res.status(500).json(err);
     });
   });

server.post('/login', (req, res) => {
    const creds = req.body;
   ​
    db('users')
     .where({ username: creds.username })
     .first()
     .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
       const token = generateToken(user);
       res.status(200).json({ welcome: user.username, token });
      } else {
       res.status(401).json({ message: 'you shall not pass!' });
      }
     })
     .catch(err => {
      res.status(500).json({ err });
     });
   });

   server.get('/users', restricted, (req, res) => {
    db('users')
     .select('id', 'username', 'password')
     .then(users => {
      res.json({ users });
     })
     .catch(err => res.send(err));
   });


server.listen(port, ()=> console.log(`API running on port ${port}`));
