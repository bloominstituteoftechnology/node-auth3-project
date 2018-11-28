// Imports
const express = require('express');
const middlewareConfig = require('./middleware/middlewareConfig.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./data/dbConfig.js');

// Initializes server
const server = express();

// Sets up middleware
middlewareConfig(server);

// Function to create a json web token
const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const secret = "This is brandon's personal secret";

  const options = {
    expiresIn: '5m'
  };

  return jwt.sign(payload, secret, options);
};

// Function to project routes
const protected = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    next();
  } else {
    res.status(401).json({ message: 'You shall not pass.' });
  }
};

// Endpoint to check if server is running
server.get('/', (req, res) => {
  res.send('Alive');
});

// Endpoint for registering a new user to the database
server.post('/api/register', (req, res) => {
  // Grab the credentials of the user
  const credentials = req.body;
  // Hash the password x10
  const hashedPassword = bcrypt.hashSync(credentials.password, 10);
  // Replace the users password with the hashed one before adding
  credentials.password = hashedPassword;
  // Insert the new user into the table
  db('users')
    .insert(credentials)
    .then(ids => {
      res.status(201).json({ message: 'User was successfully added.', ids });
    })
    .catch(error => res.json(error));
});

// Endpoint for logging in a user
server.post('/api/login', (req, res) => {
  // Grabs the credentials
  const credentials = req.body;
  // Logs the user in
  db('users')
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: 'Successful log in', token });
      } else {
        res.status(401).json({ message: 'You shall not pass' });
      }
    })
    .catch(error => {
      res.json(error);
    });
});

// Endpoint for getting all the users
server.get('/api/users', protected, (req, res) => {
  db('users')
    .select('id', 'username', 'password', 'department')
    .then(users => res.json(users))
    .catch(error => res.json(error));
});

server.listen(8000, () => console.log('==== Listening on port 8000 ===='));
