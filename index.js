const express = require('express');
const server = express();

const db = require("./data/db")
const bcrypt = require('bcryptjs');

server.use(express.json());

const port = 8000;

// root view users table
server.get("/", (req, res) => {
  db.select().from('users')
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.status(500).send({ error: error })
    })
})
// register user, hash password
server.post("/api/register", (req, res) => {
  const { username, password, department } = req.body;
  const hashedPass = bcrypt.hashSync(password, 10);

  db.insert({
    "username": username,
    "password": hashedPass,
    "department": department
  }).into('users')
   .then(response => (res.json(response)))
   .catch(error => {
     res.status(500).send({ error: error })
   })
});
server.listen(port, () => { console.log(`Server is running on port ${port}`)});
