require('dotenv').config(); 


const db = require("./dbConfig");
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs'); 
const server = express();

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['sales', 'marketing'], // this will come from the database
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1m',
  };

  return jwt.sign(payload, secret, options);
}

server.use(express.json());
server.use(cors());

server.post('/api/login', (req, res) => {
    // grab username and password from body
    const creds = req.body;
  
    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          // passwords match and user exists by that username
          const token= generateToken(user);
          res.status(200).json({ message: 'Come on in!' });
        } else {
          // either username is invalid or password is wrong
          res.status(401).json({ message: 'invalid username or password' });
        }
      })
      .catch(err => res.json(err));
  });
server.post("/api/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 4);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.send(err);
    });
});
function protected(req, res, next) {
  // token is normally sent in the the Authorization header
  const token = req.headers.authorization;

  if (token) {
    // is it valid
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // token is invalid
        res.status(401).json({ message: 'invalid token' });
      } else {
        // token is gooooooooooood
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    // bounced
    res.status(401).json({ message: 'not token provided' });
  }
}
server.get("/api/users",protected, (req, res) => {
  db("users")
    .select("id", "username", "password")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.get('/', (req, res) => {
    res.send('Its Alive!');
  });

server.listen(3300, () => console.log("alive at 3300"));

