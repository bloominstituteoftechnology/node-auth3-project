const express = require('express');
const bcrypt = require('bcryptjs');
// const session = require('express-session');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

function roles(req, res, next) {
  return function(roles) {
    if (req.session && req.session.username === 'thomas') {
      // find the user in the db by the user id in the cookie
      // check that the the user has one of the roles allowed
      next();
    } else {
      return res.status(401).json({ error: 'Incorrect credentials' });
    }
  };
}

// configure express-session middleware
// server.use(
//   session({
//     name: 'notsession', // default is connect.sid
//     secret: 'nobody tosses a dwarf!',
//     cookie: {
//       maxAge: 1 * 24 * 60 * 60 * 1000,
//       secure: false, // only set cookies over https. Server will not send back a cookie over http.
//     }, // 1 day in milliseconds
//     httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
//     resave: false,
//     saveUninitialized: true,
//   })
// );

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.get('/setname', (req, res) => {
  req.session.name = 'Frodo';
  res.send('got it');
});

server.get('/getname', (req, res) => {
  const name = req.session.name;
  res.send(`hello ${req.session.name}`);
});

server.post('/register', function(req, res) {
  const user = req.body;

  // hash password
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  console.log(user)
  
  db('users')
    .insert(user)
    .then(function(ids) {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(user => {
          // generate the token
          const token = generateToken(user);
          // req.session.username = user.username;

          // attach the token to the response
          res.status(201).json(token);
        });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

const secret = 'nobody tosses a dwarf!';

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
    jwtid: '8728391',
  };

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: 'you shall not pass!! - token invalid' });
      }

      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' });
  }

  // if (req.session && req.session.username === 'thomas') {
  //   next();
  // } else {
  //   return res.status(401).json({ error: 'Incorrect credentials' });
  // }
}

server.post('/login', function(req, res) {
  const credentials = req.body;

  db('users')
    .where({ username: credentials.username })
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        // generate the token
        const token = generateToken(user);

        // req.session.username = user.username;

        // attach token to the response
        res.send(token);
      } else {
        return res.status(401).json({ error: 'Incorrect credentials' });
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

server.get('/users', protected, (req, res) => {
  console.log('token', req.jwtToken);

  db('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.get('/hobbits', roles(['hobbits']), (req, res) => {
  // this is also protected
  res.send('here, have some hobbits: sam, pippin, merry, frodo');
});

server.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('error logging out');
      } else {
        res.send('good bye');
      }
    });
  }
});

server.listen(3300, () => console.log('\nrunning on port 3300\n'));