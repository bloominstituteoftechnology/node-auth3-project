// express
const express = require('express');
const server = express();

// bcrypt
const bcrypt = require('bcryptjs');

// databases
const registerDB = require('./data/helpers/registerDB');

// error handling middleware
const { registerConstraints, loginConstraints } = require('./middleware');
const errors = require('./middleware/errors');

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
        res
          .status(200)
          .json({ message: `User with id:${response.id} has been added.` });
      } else {
        res.status(400).json({
          error: `Undetermined error adding project.`,
        });
      }
    } catch (err) {
      res.status(500).send(`${err}`);
      next(err);
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
