// express
const express = require('express');
const server = express();
// bcrypt
const bcrypt = require('bcryptjs');
// JWT
const { jwtRoute, generateToken } = require('./middleware/jwt');
// databases
const registerDB = require('./data/helpers/registerDB');
const usersDB = require('./data/helpers/usersDB');
// error handling middleware
const { registerConstraints, loginConstraints } = require('./middleware');
const errors = require('./middleware/errors');
// turn on cors
const cors = require('cors');

server.use(express.json());
const PORT = 3000;

// base endpoints here
server.get('/', (req, res) => {
  res.send('it is working...');
});

/*
  RESISTER ENDPOINTS
*/
server.post('/api/register', registerConstraints, async (req, res) => {
  const { USERNAME, CLEARPASSWORD, DEPARTMENT } = req;

  try {
    // hash the password
    const HASH = await bcrypt.hash(CLEARPASSWORD, 14);
    const USER = { username: USERNAME, password: HASH, department: DEPARTMENT };
    try {
      const response = await registerDB.insert(USER);
      if (response) {
        // set JWT: generate the token
        const token = generateToken(USER);
        // attach token to the response
        res.status(200).send(token);
      } else {
        res.status(400).json({
          error: `Undetermined error adding user.`,
        });
      }
    } catch (err) {
      res.status(500).send(`${err}`);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

/*
  LOGIN ENDPOINTS
*/
server.post('/api/login', loginConstraints, async (req, res) => {
  const { USERNAME, CLEARPASSWORD } = req;

  try {
    const USER = await usersDB.getByUsername(USERNAME);
    if (USER) {
      const VALID = await bcrypt.compare(CLEARPASSWORD, USER.password);
      if (VALID) {
        // set JWT: generate the token
        const token = generateToken(USER);
        // attach token to the response
        res.status(200).send(`Logged in`);
      } else {
        res.status(401).send(`You shall not pass!`);
      }
    } else {
      // error with the user, but don't let the hackers know!
      // take the same amount of time as if legit checking
      await bcrypt.compare(
        CLEARPASSWORD,
        '$2a$14$plRslh.07bHu/BWHztxq9.20YIJluMBo9JhdIOCJOQjvAZHmbPV6a',
      );
      res.status(401).send(`You shall not pass!`);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

/*
  USERS ENDPOINTS
*/
server.get('/api/users', jwtRoute, async (req, res) => {
  try {
    const USERS = await usersDB.get();
    if (USERS.length === 0) {
      res.status(200).json({ message: 'There are currently no users' });
    } else {
      const USER = req.jwtToken;
      res
        .status(200)
        .send(
          `Welcome ${USER.username}! Here are the users ${JSON.stringify(
            USERS,
          )}`,
        );
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// error handling
server.use(errors);

// not found - 404
server.use((req, res) => {
  res.status(404).send(`<h1>404: resource "${req.url}" not found</h1>`);
});

server.listen(
  PORT,
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`),
);
