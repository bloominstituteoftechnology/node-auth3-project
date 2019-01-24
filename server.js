const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt')
const dbConfig = require('./knexfile.js')
require('dotenv/config')

const PORT = process.env.PORT;


const db = knex(dbConfig[process.env.DEV])

const server = express();

server.use(express.json())

server.get('/api/users', (req, res) => {
      db('users')
      .then(info => {
        res.json(info);
      })
      .catch((err) => {
        res.status(500).json({err: `Failed to get users! ${err}`})

      }
)})


server.post('/api/register', (req,res) => {
  const user = req.body;

  user.password = bcrypt.hashSync(user.password,16) 
  const missing = ['username', 'password', 'department'].filter(item => {return user.hasOwnProperty(item) === false})
  if(missing.length===0)
  {db('users').insert(user)
  .then(ids => {
      res.status(201).json({message: `user ${user.username} added`})})
  .catch(err => {
      res.status(500).json({err: `Could not add user! ${err}`})
  })
  }

  else {res.status(500).json({message: `missing info: ${missing}`})}
  })














server.listen(PORT, (err) => {
  if (err) {console.log(err)}
  else {console.log(`listening on port ${PORT}`)}
})