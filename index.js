const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/dbConfig');

const app = express();

const PORT = 8080;

const secret = 'secretstuff';

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'hey, the app is running' });
});

// POST /api/register
app.post('/api/register', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);
  // console.log(user);
  db('users').insert(user)
    .then(id => {
      res.json(id)
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// POST /api/login
app.post('/api/login', (req, res) => {
  const creds = req.body;
  db('users').where('username', creds.username)
    .then(user => {
      console.log(user[0].password);
      console.log(bcrypt.compareSync(creds.password, user[0].password));
      if (user && bcrypt.compareSync(creds.password, user[0].password)) {
        // return jwt
        const token = jwt.sign({subject: user.id}, secret);
        res.json({id: user.id, token});
      } else {
        res.status(400).json({message: 'You shall not pass!'});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// GET /api/users


app.listen(PORT, () => {
  console.log(`app is running on PORT: ${PORT}`);
});
