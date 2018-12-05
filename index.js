require('dotenv').config();


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

function generateToken(user) {
  const payload = {
    subject: user.userId,
    username: user.username
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret, options);
}

server.get('/', (req, res) => {
    res.send('The hills are alive...');
});

server.get("/users", (req, res) => {
      db("authorize")
      .then(creds => {
        res.json(creds);
      }
      );
});
  
  server.post("/api/register", (req, res) => {
    const credentials = req.body;
  
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
  
    db("authorize")
      .insert(credentials)
      .then(ids => {
        const id = ids[0];
        res.status(201).json({ newUserId: id });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  server.post("/api/login", (req, res) => {
    const creds = req.body;
  
    db("authorize")
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ welcome: creds.username, token });
        } else {
          res.status(401).json({ message: "you shall not pass!" });
        }
      })
      .catch(err => res.status(500).json({ err }));
  });
  

  
server.listen(9000, () => console.log("\n Port 9000 \n"));