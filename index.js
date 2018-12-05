const express = require('express');
const bcrypt = require('bcryptjs');

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

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
          req.session.userId = user.id;
          res.status(200).json({ welcome: creds.username });
        } else {
          res.status(401).json({ message: "you shall not pass!" });
        }
      })
      .catch(err => res.status(500).json({ err }));
  });
  

  
server.listen(9000, () => console.log("\n Port 9000 \n"));