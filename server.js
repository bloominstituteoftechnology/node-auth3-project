const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt')
const dbConfig = require('./knexfile.js')
const jwt = require('jsonwebtoken')

const secret = "gold";

require('dotenv/config')

function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: '10min',
    jwtid: '4040'
  }
  return jwt.sign(payload,secret,options)
}

function protected(req,res, next) {

  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken ) => {
        if (err) {
          res.status(401).json({message: `Invalid Token`})
        }

        else {
          req.username = decodedToken.username;
          next();
        }
  } )
}

else { res.status(401).json({message: `No Token`})
}

}


const PORT = process.env.PORT;


const db = knex(dbConfig[process.env.DEV])

const server = express();

server.use(express.json())

server.get('/api/users', protected, (req, res) => {

      if (req.username) {db('users')
      .then(info => {
        res.json(info);
      })
      .catch((err) => {
        res.status(500).json({err: `Failed to get users! ${err}`})

      }
)}
      else { res.status(500).json({err: `Failed to get users!`})
    }})


server.post('/api/register', (req,res) => {
  const user = req.body;

  user.password = bcrypt.hashSync(user.password,16) 
  const missing = ['username', 'password', 'department'].filter(item => {return user.hasOwnProperty(item) === false})
  if(missing.length===0)
  {db('users').insert(user)
  .then(ids => {
    const id = ids[0];
      db('users')
      .where({id})
      .first()
      .then(user => {
        const token = generateToken(user);

        res.status(201).json({id: user.id, token})

      })
      res.status(201).json({message: `user ${user.username} added`})})
  .catch(err => {
      res.status(500).json({err: `Could not add user! ${err}`})
  })
  }

  else {res.status(500).json({message: `missing info: ${missing}`})}
  })


  server.post('/api/login', (req,res) => {
    const creds = req.body;
  
    db('users')
    .where({username: creds.username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.json({message: `${user.username}, You are logged in!`, department: user.department, token});

      }

      else {res.status(401).json( {message: `Failed to login!`})}
    })
    .catch(err => {
      res.status(500).json({message: `${err}`})
  })
    })













server.listen(PORT, (err) => {
  if (err) {console.log(err)}
  else {console.log(`listening on port ${PORT}`)}
})