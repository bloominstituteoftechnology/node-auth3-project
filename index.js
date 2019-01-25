const express = require('express');
const server = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
server.use(express.json(), cors());

const db = require('./dbConfig');

const PORT = 4020;

const secret = 'This is not my secret!';

const generateToken = user => {
  const payload = {
    department: user.department
  };
  const options = {
    expiresIn: '1h',
    jwtid: bcrypt.hashSync(user.username, 4),
    subject: `${user.id}`
  };
  return jwt.sign(payload, secret, options);
};

const protectRoute = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    console.log(token);
    jwt.verify(token, secret, (err, decodedToken) => {
      err
        ? res.status(401).json({ message: 'Invalid token!' })
        : ((req.department = decodedToken.department), next());
    });
  } else {
    res.status(403).json({ error: 'FORBIDDEN!!!' });
  }
};

const checkDepartment = (req, res, next) => {
  req.department === 'webpt2'
    ? next()
    : res.status(401).send('Wrong Department!!!');
};

server.post('/api/register', (req, res) => {
  const user = req.body;
  if (!user.password || !user.username) {
    res.status(400).json({ error: 'Username and Password are required!' });
  }
  user.password = bcrypt.hashSync(user.password, 12);
  db('users')
    .insert(user)
    .then(ids => {
      user.id = ids[0];
      res.status(201).json(generateToken(user));
    })
    .catch(err => res.status(500).json(err));
});

server.post('/api/login', (req, res) => {
  const creds = req.body;
  db('users')
    .where('username', creds.username)
    .first()
    .then(user =>
      user && bcrypt.compareSync(creds.password, user.password)
        ? res.json(generateToken(user))
        : res.status(401).json({ message: 'You shall not pass!' })
    )
    .catch(err => res.status(500).send('HEREEEEE'));
});

server.get('/api/users', protectRoute, checkDepartment, (req, res) => {
  db('users')
    .select('id', 'username', 'department')
    .then(users =>
      !users.length
        ? res.status(404).json({
            error: 'There is no users just yet, please try again later.'
          })
        : res.json(users)
    )
    .catch(err => res.status(500).json(err));
});

server.listen(PORT, () =>
  console.log(`Server is up and running in port: ${PORT}`)
);
