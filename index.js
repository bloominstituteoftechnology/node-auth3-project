const express = require('express');
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)
const bcrypt = require('bcryptjs')
const server = express();


server.use(express.json())

server.get('/', (req, res) => {
  res.send(`Hello`)
})

protected = (req, res, next) => {
  // if(req.session && req.session.user) {
  //   next()
  // } else {
  //   res.status(401).json({message: 'You shall not pass!'})
  // }
}

server.get('/api/users', (req, res) => {
      db('users')
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json(err))
})

server.post('/api/users', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 2)
  creds.password = hash;
  db('users').insert(creds).then(ids => {
    res.status(201).json(ids)
  }).catch(err => res.json(err))
});

server.post('/api/login', (req, res) => {
  const creds = req.body
  db('users').where({username: creds.username}).first()
  .then(user => {
    if(user && bcrypt.compareSync(creds.password, user.password)) {
      //the token stuff goes here.
      res.status(200).json({message: `Welcome ${user.username}`})
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

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
