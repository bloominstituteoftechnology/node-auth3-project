const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./db/dbconfig.js');

const server = express();

server.use(express.json());
server.use(cors());

const secret = 'blue wristband';

function generateToken(user) {
    const payload = {
      username: user.username,
    };
  
    const options= {
      expiresIn: '1h',
      jwtid: '12345' // not needed, jti
    };
  
    return token = jwt.sign(payload, secret, options);
  }
  
  function protected(req, res, next) {
    // read the token from the Authorization header
    const token = req.headers.authorization;
  
    if(token){
      // verify the token
      jwt.verify(token, secret, (err, decodedToken) => {
        if(err) {
          // token is invalid
          res.status(401).json({message: 'Invalid Token'});
        }
        else{
          // token is valid
          console.log(decodedToken);
          req.user = { username: decodedToken.username };
          next();
        }
      })
    }
    else{
      res.status(401).json({ message: 'no token provided' });
    }
  
  }
  
  server.get('/', (req, res) => {
    res.send('Its Alive!');
  });
  
  server.post('/api/register', (req, res) => {
    // grab credentials
    const creds = req.body;
  
    // hash the password
    const hash = bcrypt.hashSync(creds.password, 10);
    // a > 345 > 3er > 45d >  n times = 2^10 =
  
    // TLS secure communication between nodes
    // computer > isp > node1 > node 3 > node 13 > server
  
    // replace the user password with the hash
    creds.password = hash;
  
    // save the user
    db('users')
      .insert(creds)
      .then(ids => {
        const id = ids[0];
  
        // find the user using the id
        db('users').where({id}).first().then(user => {
          // generate a token
          const token = generateToken(user);
          // attach that token to the response
          // return 201
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).send(err))
      })
      .catch(err => res.status(500).send(err));
  });
  
  server.post('/api/login', (req, res) => {
    // grab creds
    const creds = req.body;
  
    // find the user
    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        // check creds
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          // generate a token
          const token = generateToken(user);
          // attach that token to the response
         res.status(200).json({token});
        } else {
          res.status(401).json({ message: 'You shall not pass!' });
        }
      })
      .catch(err => res.status(500).send(err));
  });
  
  // To logout, destroy the token or let it expire
  
  // protect this route, only authenticated users should see it
  server.get('/api/users', protected, (req, res) => {
    db('users')
      .select('id', 'username', 'password')
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  
  server.listen(3300, () => console.log('\nrunning on port 3300\n'));