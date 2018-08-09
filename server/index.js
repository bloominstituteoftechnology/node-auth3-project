const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const db = require('./data/db');

const app = express();

app.use(express.json());
app.use(cors());

const JWT_SECRET = 'shark week is best week';

app.post('/api/register', (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.departments) {
    return res
      .status(400)
      .json({ error: 'Registration must fill out all required fields' });
  }

  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;

  db('users')
    .insert(newUser)
    .then(ids => {
      // save the record then send back the saved record
      console.log('console logging ids', ids);
      db('users')
        .first()
        .where({ id: ids[0] })
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ token, user });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => res.status(500).json(err));
});

app.post('/api/login', (req, res) => {
  const credentials = req.body;
  console.log(credentials);

  db('users')
    .where({ username: credentials.username })
    .then(user => {
      // if (!user || bcrypt.compareSync(credentials.password, user.password)) {
      //   return res.status(401).json({ message: 'Incorrect credentials' });
      // }

      const token = generateToken(user);
      res.status(200).json({ token, user });
    })
    .catch(err => res.status(500).json(err));
});

app.get('/api/users', protected, (req, res) => {
  db('users')
    .select('username', 'id', 'departments')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
});

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '24h',
    jwtid: '8728391'
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'You shall not pass! - Invalid Token!' });
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ message: 'You shall not pass! - No Token!' });
  }
}

app.listen(8000, () => {
  console.log('Server listening on PORT 8000');
});
