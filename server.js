//module import
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors')



//knex config
const dbConfig = require('./knexfile.js')
const db = knex(dbConfig.development);

//server config
const server = express();

//middleware configuration:
server.use(express.json());
server.use(helmet());


//proteced middleware using token verification


//generate jwt token
function newToken(user) {
  const payload = {
    username: user.username
  }
  const secret = 'monkey'

  const options = {
    expiresIn: '1h',
    jwtid: '45678'
  }
  return jwt.sign(payload, secret, options);
};




//------Endpoints------//
//----POST ------//
//register

server.post("/api/register", (req, res) => {
      const credentials = req.body;
      const hashnum = bcrypt.hashSync(credentials.password, 14);
      credentials.password = hashnum;

      db("auth")
        .insert(credentials)
        .then(users => {
          const id = users[0];
          db('auth')
            .where(id)
            .first()
            .then(user => {
              const jswebtkn = newToken(user);
              res.status(201).json(id);

            })

            .catch(err => res.status(500).send(err));
        });
    })

      //login
      server.post("/api/login", (req, res) => {
        const credentials = req.body;
        db("auth")
          .where({
            username: credentials.username
          })
          .first()
          .then(user => {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
              //pulling username off user into the cookie
              const token = newToken(user)


              res.status(200).json({
                token
              });
              //send dat token back
              //not sure why
            } else {
              res.status(401).json({
                message: "They wanna see me go AY, all you gotta do is speak on ye!"
              });
            }
          })
          .catch(err => res.status(500).send(err));
      });
//proteced middleware
      function protected(req, res, next) {
        const token = req.headers.authorization;
        if (token) {
          jwt.verify(token, secret, (err, passedToken) => {
            if (err) {

              return res.status(401).json({
                error: 'Unauthorized Access'
              })
            } else {
              req.user = {
                username: passedToken.username,
                derpatment: passedToken.department
              }
              next()
            }
          })
        } else {
          return res.status(401).json({
            error: 'no Token received'
          })
        }
      };

      //--Get--//
      server.get('/api/users', protected, (req, res) => {
        db('auth')
          .select('id', 'username', 'department')
          .where({
            department: req.user.department
          })
          .then(user => {
            res.status(200).json(user)
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({
              message: 'user not found'
            })
          })
      });

      //-------Listener--------//
      const port = 8000;
      server.listen(port, function() {
        console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
      });
