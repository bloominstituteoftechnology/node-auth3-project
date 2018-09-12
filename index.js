const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get('/', (req, res) => {
  db('users')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.post('/', (req, res) => {
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 8);

  db('users').insert(user)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.error(err);
    })
})

server.listen(8000, () => {
  console.log('== LISTENING ON PORT 8K ==');
})
