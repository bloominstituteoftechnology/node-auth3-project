const express = require('express');
const server = express();

const db = require("./data/db")
const bcrypt = require('bcryptjs');

server.use(express.json());

const port = 8000;

server.get("/", (req, res) => {
  db.select().from('users')
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.status(500).send({ error: error })
    })
})

server.listen(port, () => { console.log(`Server is running on port ${port}`)});
