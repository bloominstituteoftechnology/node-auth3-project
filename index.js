const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');
const jwt = require('jsonwebtoken');
const db = knex(knexConfig.development);
const bcrypt = require('bcryptjs');
const PORT = 1234;

const server = express();

server.use(express.json());
server.use(cors());


const secret = 'seecreeettt';

// use jwts instead of sessions
function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };
  // the secret is typically on another file (ENV)
  

  const options = {
    expiresIn: '1h',
    jwtid: '12345', // jti
  }
  // const token = jwt.sign(payload, secret, options);
  // return token;
  return jwt.sign(payload, secret, options);
};


server.get('/', (req, res) => {
  res.send('Server up and running!!!!');
});

server.post('/api/register', (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      // find the user using the id
      db('users')
        .where({ id })
        .first()
        .then(user => {
          // generate a token
          const token = generateToken(user);
          // attach that token to the response
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => {
          res.status(500).send(err);
        })
    })
    .catch(err => res.status(500).send(err));
});

server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
  .where({ username: creds.username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      // generate a token
      const token = generateToken(user);
      //attach that token to the response
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "You shall not pass!" });
    }
  })
  .catch(err => res.status(500).send(err));
});

function protected(req, res, next) {
  // use jswt instead of sessions
  // read the token string from the Authorization header
  const token = req.headers.authorization;

  if (token) {
    // verify the token
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) {
        // token is invalid
        res.status(401).json({ message: "Invalid Token" });
      } else {
        // token is valid
        console.log(decodedToken);
        req.username = decodedToken.username;

        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}


server.get('/api/users', protected, (req, res) => {
  db('users')
    .select('id', 'username', 'password', 'department')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
