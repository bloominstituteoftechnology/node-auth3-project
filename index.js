const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');
const jwt = require('jsonwebtoken');
const db = knex(knexConfig.development);
const bcrypt = require('bcryptjs');
const PORT = 1234;

const server = express();

server.use(express.json());
server.use(cors());

// use jwts instead of sessions
function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };
  const secret = 'seecreeettt';

  const options = {
    expiresIn: '1h',
    jwtid: '12345', // jti
  }
  // const token = jwt.sign(payload, secret, options);
  // return token;
  return jwt.sign(payload, secret, options);
};

server.get('/', (req, res) => {
  res.send('Server up and running!!!!');
});

server.post('/api/register', (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      // find the user using the id
      db('users')
        .where({ id })
        .first()
        .then(user => {
          // generate a token
          const token = generateToken(user);
          // attach that token to the response
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => {
          res.status(500).send(err);
        })
    })
    .catch(err => res.status(500).send(err));
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
