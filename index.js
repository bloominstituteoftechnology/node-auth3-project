const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();
const cors = require('cors');
const db = require('knex')(require('./knexfile').development);

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;
const secret = process.env.SECRET || 'secretWithSevenSssssss';

const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());

function authenticate(req, res, next) {
  const { authentication: token } = req.headers;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Authentication failed.'});
    } else {
      req.locals = { authorization: decoded };
      next();
    }
  });
}

server.use('/api/restricted/', authenticate);

server.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then(hash => db('users').insert({ username, hash }))
    .then((id) => {
      res.status(200).json(username);
    })
    .catch((err) => {
      console.log('An error occurred', err);
      res.status(400).json({ message: 'We were unable to register this user successfully' });
    });
});

server.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db('users')
    .select('hash')
    .where('username', '=', username)
    .first()
    .then(({ hash }) => {
      return bcrypt.compare(password, hash)
    })
    .then((verdict) => {
      if (verdict) {
        const token = jwt.sign({ username }, secret, { expiresIn: '24h' });
        res.status(200).json(token);
      } else {
        res.status(406).json({ message: 'System could not log user in.' });
      }
    })
    .catch((err) => {
      console.log('An error occurred', err);
      res.status(400).json({ message: 'An error occurred when attempting log-in.' });
    });
});

server.get('/api/restricted/authenticate', (req, res) => {
  if (req.locals.authorization) {
    res.status(200).json(req.locals.authorization);
  }
});

server.get('/api/restricted/users', (req, res) => {
  db('users')
    .select('username', 'id')
    .then((usernames) => {
      return res.status(200).json(usernames);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      return res.status(500).json({ message: 'Could not obtain requested data' });
    });
});

server.listen(8000, () => console.log('\nrunning on port 8000\n'));

/*
const dotenv = require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const db = require('./database/dbConfig.js');

const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());

const host = process.env.HOST || 'localhost';


//________ FUNCTIONS / MIDDLEWARE_______
function authenticate(req, res, next) {
  const { authentication: token } = req.headers;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Authentication failed.'});
    } else {
      req.locals = { authorization: decoded };
      next();
    }
  });
}

server.use('/api/restricted/', authenticate);

  ///________________ POST ________________
  server.post('/api/restricted/login', (req, res) => {
    const { username, password } = req.body;
    db('users')
      .select('hash')
      .where('username', '=', username)
      .first()
      .then(({ hash }) => {
        return bcrypt.compare(password, hash)
      })
      .then((verdict) => {
        if (verdict) {
          const token = jwt.sign({ username }, secret, { expiresIn: '24h' });
          res.status(200).json(token);
        } else {
          res.status(406).json({ message: 'System could not log user in.' });
        }
      })
      .catch((err) => {
        console.log('An error occurred', err);
        res.status(400).json({ message: 'An error occurred when attempting log-in.' });
      });
  });
server.post('/api/restricted/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then(hash => db('users').insert({ username, hash }))
    .then((id) => {
      res.status(200).json(username);
    })
    .catch((err) => {
      console.log('An error occurred', err);
      res.status(400).json({ message: 'We were unable to register this user successfully' });
    });
});
    / grab username and password from body
    const creds = req.body;
  
    // generate the hash from the user's password
    const hash = bcrypt.hashSync(creds.password, 4); // rounds is 2^X
  
    // override the user.password with the hash
    creds.password = hash;
  
    // save the user to the database
    db('users')
      .insert(creds)
      .then(ids => {
        res.status(200).json(ids);
      })
      .catch(err => json(err));
  });
  /// ********** PROTECTED ************
  //______________ GET users________________
  server.get('/api/users', protected, (req, res) => {
    db('users')
      .select('id', 'username', 'password', 'department') // ***************************** added password to the select
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  */