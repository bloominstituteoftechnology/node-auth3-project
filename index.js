const express = require('express'); 
const knex = require('knex'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const dbConfig = require('./knexfile'); 
const cors = require ('cors')

 const server = express(); 
 const db = knex(dbConfig.development); 
 
 server.use(express.json()); 

 const secret = 'secret'
 
 function generateToken(user) {
    const payload = {
      username: user.username
    };
    const options = {
      expiresIn: "2hr",
      jwtid: "54321"
    };
    return kwt.sign(payload, secret, options);
  }

 server.get('/', (req, res) => {
    res.send('Test');
});

server.post("/api/register", (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    db("users")
      .insert(creds)
      .then(ids => {
        const id = ids[0];
        db("users")
          .where({ id })
          .first()
          .then(user => {
            const token = generateToken(user);
            res.status(201).json({ id: user.id, token });
          })
          .catch(err => res.status(500).send(err));
      })
      .catch(err => res.status(500).send(err));
  });

 server.listen(3000, () => {
    console.log("Server is listening on PORT 3000"); 
}); 