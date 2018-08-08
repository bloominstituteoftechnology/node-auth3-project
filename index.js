const express = require('express');
const session = require('express-session');
const server = express();

const db = require("./data/db")
const bcrypt = require('bcryptjs');

server.use(express.json());
server.use(
  session({
    name: 'notsession', // default is connect.sid
    secret: 'mySecret',
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    secure: true, // only set cookies over https. Server will not send back a cookie over http.
    resave: false,
    saveUninitialized: false,
  })
);

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
//check current logged in user
server.get("/check", (req, res) => {
  res.send(`hello ${req.session.username}`);
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
//login check, need session create
server.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.select('password').from('users').where('username', username)
  .then(response => {
    let hashed = response[0].password;

      if (!bcrypt.compareSync(password, hashed)) {
        return res.status(401).json({ error: 'Incorrect credentials' });
        }
      else {
        req.session.username = username;
        res.json({"Message": "Logged in!"})
      }
    })
    .catch(error => {
      res.status(500).send({ error: error })
    })
})



server.listen(port, () => { console.log(`Server is running on port ${port}`)});
