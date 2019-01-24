
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');;
const db = require('./database/dbHelpers');
const server = express();
const bcrypt = require('bcryptjs');
const session = require('express-session');

server.use(express.json());
server.use(cors())

const secret = "secretsecretsecret";

function generateToken(user) {
    const payload = {
       username: user.username,
       
    }
    const options = {
       expiresIn: "1hr",
       jwtid: '12345',
    }
    return jwt.sign(payload, secret, options)
 }



server.get('/', (req, res) => {
  res.send('Its Alive!');
});


server.post('/api/register', (req, res) => {
    const user = req.body
    user.password = bcrypt.hashSync(user.password, 12)

     db. insertUser(user)
        .then(ids => {
            const id = ids[0]
            db.findUsers(id)
                .then(user => {
                    const token = generateToken(user);
                    res.status(201).json({id: user.id, token})
                })
                .catch(err => {
                    res.status(404).send(err)
                })
        })
        .catch(err => {
            res.status(500).send(err)
        }
        )

 });

 function protected(req, res, next) {
    const token = req.headers.authorization;
  
     if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                //token will be invalid
                res.status(401).json({message: "Invalid Token"})
            } else {
                req.username = decodedToken.username
                next();
            }
        })
  
     } else {
        res.status(401).json({ message: 'no token yo!' })
    }
  }

  
 server.post("/api/login", (req, res) => {
    const login = req.body;
    if (login.username && login.password) {
       db.findByUsername(login.username)
          .then(users => {
             if(users.length && bcrypt.compareSync(login.password, users[0].password)) {
             const token = generateToken(users[0])
             res.status(200).json({token});
              } else { res.status(404).send("You shall not pass!");}
          })
          .catch(err => {
             res.status(500).send(err);
          });
    } else  res.status(400).json({err: "please provide a username and password"});
 })


 server.get("/api/users", protected, (req, res) => {
    db.findUsers()
       .then(users => {res.json(users)})
       .catch(err => {res.json(err)});
 });


server.listen(8000, () => console.log('Running on port 8000'));

