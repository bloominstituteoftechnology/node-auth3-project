require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');
const server = express();

server.use(express.json());
server.use(cors());

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

server.get('/', (req, res) => {
  res.send('yr server is fine, relax');
});

server.post('/login', (req, res) => {
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

server.listen(8000, () => console.log('\nS E R V I N G   O N   8 0 0 0'));
