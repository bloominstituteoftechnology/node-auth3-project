const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbHelpers.js');
const PORT = 3500;

const server = express();
server.use(express.json())

// Custome Middleware

function generateToken() {
    const payload = {
      jwtid: user.id,
      username: user.username
    };
    const secret = 'youwontguessit';
    const options = {
        experesIn: '1h'
    }
    return jwt.sign(payload, secret, options)
}

server.post("/api/register", (req, res) => {
    const user = req.body;
    if (user.username && user.password) {
    user.password = bcrypt.hashSync(user.password, 10);
    db.insert(user)
       .then(ids => {
          const id = ids[0];
          db.findById(id)
             .then(user => {
                if(user){
                   const token = generateToken(user[0]);
                   res.status(201).json({id: ids[0], token});
                } else {
                   res.status(404).send("User not found");
                }
             })
       })
       .catch(err => {
          res.status(500).send(err);
       })
    } else  res.status(400).json({err: "please provide a username and password"});
 });


 server.get("/api/users", (req, res) => {
    db.findUsers()
       .then(users => {res.json(users)})
       .catch(err => {res.json(err)});
 });

//SERVER

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});