require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');
const server = express();

server.use(express.json());
server.use(cors());

// G E N E R A T E   J W T   T O K E N
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1m'
  };

  return jwt.sign(payload, secret, options);
}

// P R O T E C T E D   M I D D L E W A R E
const protected = (req, res, next) => {
  // token sent in authorization header
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // token is no good
        res.status(401).json({ message: 'token is invalid' });
      } else {
        // token is good to go
        res.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    // you didn't even present me a token, man!
    res.status(401).json({ message: 'token not provided!' });
  }
};

// R O O T   R O U T E
server.get('/', (req, res) => {
  res.send('yr server is fine, relax');
});

// L O G I N   R O U T E : GENERATE TOKEN
server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: 'Welcome!', token });
      } else {
        res.status(200).json({ message: 'Invalid login!' });
      }
    })
    .catch(err => res.json(err));
});

// U S E R S   R O U T E :   PROTECTED

// R E G I S T E R   R O U T E
server.post('/api/register', (req, res) => {
  // grab username + password
  const creds = req.body;

  // generate hash
  const hash = bcrypt.hashSync(creds.password, 10);

  // redefine password to the hash
  creds.password = hash;

  // now save the user to the database
  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => json(err));
});

server.listen(8000, () => console.log('\nS E R V I N G   O N   8 0 0 0'));
