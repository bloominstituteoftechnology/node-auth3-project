const express = require('express');
const knex = require('knex');
const cors = require('cors');
const knexConfig = require('./knexfile.js');
const jwt = require('jsonwebtoken');
const db = knex(knexConfig.development);
const bcrypt = require('bcryptjs');
const server = express();


server.use(express.json());
server.use(cors());
server.get('/', (req, res) => {
  res.send(`Hello`)
})

generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['needed']
  }

  const secret = 'blerg'

    const options = {
      expiresIn: '1h',
    }

  return jwt.sign(payload, secret, options)
}

protected = (req, res, next) => {
  const token = req.headers.authorization;
  if(token){
    jwt.verify(token, 'blerg', (err, decodedToken) => {
      if(err) {
        res.status(401).json({message: 'invalid token'})
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    res.status(401).json({message: 'token not provided'})
  }
}

// checkRole = (role) => {
//   return (req, res, next) => {
//     if(req.decodedToken && res.decodedToken.roles.includes(role)) {
//       next()

//     } else {
//     res.status(403).json({message: 'you have no access to this resources'})
//   }
//  }
// }
server.get('/api/users', protected, (req, res) => {
      db('users')
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json(err))
})

// server.get('/api/sales', protected, checkRole('sales'), (req, res) => {
//   res.status(200).json({message: 'welcome to sales'})
// })

server.post('/api/users', (req, res) => {
  console.log(req.body)
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 2)
  creds.password = hash;
  db('users').insert(creds).then(ids => {
    res.status(201).json(ids)
  }).catch(err => res.status(500).json(err))
});

server.post('/api/login', (req, res) => {
  const creds = req.body
  db('users').where({username: creds.username}).first()
  .then(user => {
    if(user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user)
      //the token stuff goes here.
      res.status(200).json({message: `Welcome ${user.username}`, token})
    } else {
      res.status(401).json({message: 'you shall not pass'})
    }
  })
})

// server.get('/api/logout', (req, res) => {
//   if(req.session) {
//     req.session.destroy(err => {
//       if(err) {
//         res.send('you can never leave')
//       } else {
//         res.send('bye')
//       }
//     })
//   } else {
//     res.end()
//   }
// })

const port = 9000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
