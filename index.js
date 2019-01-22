// Base requires
const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');

// Server requires
const server = express();
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const PORT = 1234;

/* ---------- Middleware ---------- */
server.use(express.json());

/* ---------- Endpoints ---------- */

// POST:
// - /api/register
// - Creates a user using the information sent inside the body of the request. 
// - Hash the password before saving the user to the database.
server.post('/api/register', (req,res) => {
  const newUser = req.body;

  // Only add if non-empty user, pass & dept
  if( newUser.user && newUser.pass && newUser.dept ){
    newUser.pass = bcrypt.hashSync(newUser.pass, 3);

    db(`users`).insert(newUser)
      .then( (newId) => {
        res.status(201).json(newId);
      })
      .catch( (err) => {
        res.status(500).json({ error: `Could not register new user: ${err}` });
      });
    // end-db
  } else {
    res.status(400).json({ error: "All fields are mandatory to register." });
  }
});


// POST:
// - /api/login
// - Use the credentials sent inside the body to authenticate the user. 
// - On successful login, create a new JWT with the user id as the subject and send it back to the client. 
// - If login fails, respond with the correct status code and the message: 'You shall not pass!'
server.post('/api/login', (req,res) => {});


// GET:
// - /api/users
// - If the user is logged in, respond with an array of all the users contained in the database. 
// - If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'. 
// - Use this endpoint to verify that the password is hashed before it is saved.
server.get('/api/users', (req, res) => {});



/* ---------- Listener ---------- */
server.listen( PORT, () => {
  console.log(`\n=== Web API listening on http://localhost:${PORT} ===\n`);
});