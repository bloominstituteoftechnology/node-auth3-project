require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

const protectedAreas = require('../middleware/protectedAreas.js');
const checkDepartment = require('../middleware/checkDepartment.js');

// SCHEMA
// The user schema should include: username, password and department. The department should be a string used to group the users. No need for a departments table or setting up relationships.

// ENDPOINTS: 

// POST	/api/register	Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.
// POST	/api/login	Use the credentials sent inside the body to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'
// GET	/api/users	If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'. Use this endpoint to verify that the password is hashed before it is saved.

function generateToken(user) {

  const payload = {
    userId: user.userId,
    username: user.username,
    department: 'product' // this will come from database
  }
  // const secret = 'anySecret($&*#$%#%#$%#$)';
  const secret = process.env.JWT_SECRET; // added to .env file
  const options = {
    expiresIn: '1hr',
  }
  return jwt.sign(payload, secret, options); // take 3 arguments
}


server.post('/api/register', (req, res) => {
  // 1. grab username and password from body
  // 2. generate the hash from the user's password
  // 3. override the user.password with the hash
  // 4. save the user to the database
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14)
  creds.password = hash;
  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json({ id: ids[0]});
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err })
    })
})

server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password) ) {
        // user exists and password match
        const token = generateToken(user)
        res.status(200).json({ message: 'Logged in', user: user.username, token})
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
})
//, protectedAreas, checkDeparment('product')
server.get('/api/users', protectedAreas, checkDepartment('product'),(req, res) => {

  db('users')
    .select('id', 'username', 'password', 'department')
    // .select('username') to see just users
    .then(users => {
      res.status(201).json({ users })
    })
    .catch(err => res.send(err));
});


server.get('/', (req, res) => {
  res.json({ api: 'auth-ii up' });
});

module.exports = server;