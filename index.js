// Base requires
const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Server requires
const server = express();
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const PORT = 1234;
const secret = 'something hidden and not really here in this file';

// Middleware requirements
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

/* ---------- Middleware ---------- */
server.use(
  express.json(),
  morgan('dev'),
  helmet(),
  cors()
);

const generateToken = (user) => {
  console.log(user.user);
  const payload = {
    user: user.user,
    dept: user.dept
  };
  
  const options = {
    expiresIn: '1h',
    jwtid: '21234'
  };
  return jwt.sign(payload, secret, options);
};

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

        // Get user from db:
        db(`users`).where('id', newId[0])
          .then( (usr) => {
            const token = generateToken(usr);
            res.status(201).json({id: newId[0], token});
          });
        // end-user-db
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
server.post('/api/login', (req,res) => {
  const login = req.body;
  console.log( "/api/login", login.user, login.pass );

  db('users').where('user', login.user).limit(1)
    .then( (user) => {
      if( user.length && bcrypt.compareSync(login.pass, user[0].pass)) {
        const token = generateToken(user[0]);
        res.status(201).json({ info: "Logged in", token});
      } else {
        res.status(201).json({ error: "You shall not pass!" });
      }
    })
    .catch( (err) => {
      res.status(500).json({ error: err });
    });
});


// GET:
// - /api/users
// - If the user is logged in, respond with an array of all the users contained in the database. 
// - If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'. 
// - Use this endpoint to verify that the password is hashed before it is saved.
server.get('/api/users', (req, res) => {
  const token = req.headers.authorization;

  if( !token ){
    console.log( "Invalid login!" );
    res.status(401).json({ message: "No token provided."})
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if(err) {
      // invalid token
      res.status(401).json({ message: "You shall not pass!" });
    } else {
      // valid token
      db('users').select('id', 'user').where('dept', decodedToken.dept )
      .then( (users) => {
        res.json(users);
      })
      .catch( (err) => {
        res.status(500).json({ error: err });
      });
    // end-db  
    }
  })
});



/* ---------- Listener ---------- */
server.listen( PORT, () => {
  console.log(`\n=== Web API listening on http://localhost:${PORT} ===\n`);
});