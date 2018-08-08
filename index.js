const express = require('express');
const server = express();
const PORT = 8000;
const bcrypt = require('bcryptjs');
const db = require('./data/dbConfig');
const cors = require('cors');
const jwt = require('jsonwebtoken');
let isValid = null;

var token = jwt.sign({validity: isValid}, 'someKeyITk')
server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
  if (req.originalUrl.includes('/api/restricted/')) {
    if (req.session.validated) {
      next()
    } else {
      return res.status(401).send(`Status 401: Access Denied, please log in`);
    }
  }
  next();
});

const authenticate = async (req, res, next) => {
  const credentials = req.body;
  console.log(credentials);
  const foundUser = await db('users').where('username', credentials.username).first();
  const userHash = foundUser.password;
  isValid = bcrypt.compareSync(credentials.password, userHash);
  next();
};

server.get('/api/users', (req, res) => {
  if (req.headers.tokenkey === token) {
    db('users').where('department', req.headers.userdep).then(response => {
      res.status(200).json(response);
    }).catch(err => {
      res.status(500).json(`${err}`);
    });
  } else {
    res.status(401).json({
      status: `401 Denied`,
      message: "You are not logged in",
      newBrainTest: req.header
    });
  }
});

server.post('/api/register', async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 0);
  user.password = hash;

  try {
    if (user.username && user.password) {
      const ids = await db.insert(user).into('users');
      const id = ids[0];
      const result = await db('users').where('id', id).first()
      result.token = token;
      res.status(201).json(result);
    } else {
      throw Error;
    }
  } catch (err) {
    return console.log(`${err}`);
  }
})

server.post('/api/login', authenticate, async (req, res) => {
  if (isValid) {
    try {
      const cookie = await db('users').where('username', req.body.username).first();
      res.status(200).json({message:"Logged In", token:token, cookie: cookie.id, userDep: cookie.department});
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json({
      status: 401,
      message: 'You shall not pass!'
    })
  }
});

server.get('/api/logout', (req, res) => {
  if (isValid) {
    isValid = !isValid;
  }
});

server.get('/api/restricted/something', (req, res) => {
  res.status(200).send('Somethiiiiing!')
})

server.get('/api/restricted/', (req, res) => {
  res.status(200).send('aaaaaaaaa!');
})

server.listen(PORT, () => console.log(`App is listening on ${PORT}`))
