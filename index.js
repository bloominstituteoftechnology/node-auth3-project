const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./dbConfig');
const port = process.env.PORT || 9000;
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

function generateToken(user) {
  const jwtPayload = {
    ...user,
    hello: 'Carlo'
  };
  const jwtSecret = 'secret';
  const jwtOptions = {
    expiresIn: '1m'
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

server.post('/api/register', async (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  try {
    const response = await db('users').insert(creds);
    res.status(201).json({ message: `User created with user id ${response}` });
  } catch (err) {
    res.status(500).json({ message: 'Put a username, password, role field' });
  }
});

// server.post('/api/login', (req, res) => {
//   const creds = req.body;
//   db('users')
//     .where({ username: creds.username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(creds.password, user.password)) {
//         const token = generateToken(user);
//         res.status(200).json({ message: 'Welcome', token });
//       } else {
//         res.status(403).json({ message: 'Invalid login' });
//       }
//     })
//     .catch(err => res.status(403).json({ message: 'Invalid login' }));
// });

server.get('/api/users', protected, async (req, res) => {
  console.log(req.decodedCode, '\n the decoded code \n');
  try {
    const response = await db('users');
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.post('/api/login', async (req, res) => {
  const creds = req.body;
  try {
    const response = await db('users')
      .where({ username: creds.username })
      .first();
    if (response && bcrypt.compareSync(creds.password, response.password)) {
      const token = generateToken(response);
      req.headers.authorization = token;
      res.status(200).json({ Message: `Welcome ${creds.username}`, token });
    } else {
      res.status(403).json({ Message: 'No user on file please register' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Bad Request' });
  }
});

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'secret', (err, decodedCode) => {
      if (err) {
        res.status(403).json({ message: 'Invalid token' });
      } else {
        req.decodedCode = decodedCode;
      }
    });
    next();
  } else {
    res.status(404).json({ message: 'Invalid token' });
  }
}

server.listen(port, () => {
  console.log(`\n === Server Listening on port ${port} === \n`);
});
