
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');;
const db = require('./database/dbHelpers');
const server = express();
const bcrypt = require('bcryptjs');
const session = require('express-session');

server.use(express.json());
server.use(cors())

const secret = "ssecretsecretsecret";

 //restricts access based on login
function protect(req, res, next) {
   const token = req.headers.authorization;
   if(token){
      jwt.verify(token, secret, (err, decodedToken) => {
         if(err) {
            res.status(400).send("invalid login")
         } else {
//not sure what this does need to ask about this tuesday**
            req.username = decodedToken.username
            next();
         }
      })
   } else {
      res.status(401).json({err: "token missing"});
   }
}


function generateToken(user) {
    const payload = {
       jwtid: user.id,
       username: user.username
    }
    const options = {
       expiresIn: "1hr",
    }
    return jwt.sign(payload, secret, options)
 }


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
      res.status(401).json({ message: 'no token provided' })
  }
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
 server.post("/api/login", (req, res) => {
    const login = req.body;
    if (login.username && login.password) {
       db.findByUsername(login.username)
          .then(users => {
             if(users.length && bcrypt.compareSync(login.password, users[0].password)) {
             const token = generateToken(users[0])
             res.send(`Welcome ${login.username}`);
              } else { res.status(404).send("You shall not pass!");}
          })
          .catch(err => {
             res.status(500).send(err);
          });
    } else  res.status(400).json({err: "please provide a username and password"});
 })


 server.get("/api/users", protect, (req, res) => {
    db.findUsers()
       .then(users => {res.json(users)})
       .catch(err => {res.json(err)});
 });


server.listen(8000, () => console.log('Running on port 8000'));

