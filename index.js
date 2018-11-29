require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

  

// | GET    | /api/users    | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'. Use this endpoint to verify that the password is hashed before it is saved.       


server.post('/api/login', (req,res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(creds.password, user.password)){
        const token = generateToken(user)
        res.status(200).json({ message: 'Welcome!', token})
      } else  {
        res.status(401.json({ message: 'you shall not pass' }))
      }
    })
    .catch( error => res.json(error))
})

server.post('/api/register', (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 4);

  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => json(error))
})