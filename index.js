const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session')

const db = require('./database/dbConfig.js');
const jwt = require('jsonwebtoken')
const secret = 'secret!';


const server = express();

server.use(express.json());
server.use(cors());
server.use(session({
  // configure express-session middleware
    name: 'notsession', // default is connect.sid
    secret: 'nobody tosses a dwarf!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
}))


server.get('/', (req, res) => {
  res.send(`It's Alive!`);
});

function protected(req, res, next){
  // using jwts instead of sessions
  // read the token from the authorization header 
  const token = req.headers.authorization;

  if (token) {
    // verify the token
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // token is invalid
        res.status(401).json({message: 'Invalid token'})
      } else {
        // token is valid
        next();
      }
    })
  } else {
    res.status(401).json({message: "no token provided"})

  }
}


function generateToken(user){
  const payload = {
    username: user.username,
  }

  const options = {
    expiresIn: '1h',
    jwtid: '12345' // jti
  }

  return jwt.sign(payload, secret, options);
}

server.post('/api/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('usersWithDepartment')
  .insert(creds)
  .then(ids => {
    const id = ids[0];
    db('usersWithDepartment')
    .where({ id })
    .first()
    .then(user => {
      const token = generateToken(user);
      res.status(201).json({id: user.id, token})
    })
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
})


server.post('/api/login', (req, res) => {
  // checking that username and password matches
  const credentials = req.body;
  db('users')
  .where({username: credentials.username})
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(credentials.password, user.password)){
      // generate a token 
      const token = generateToken(user);

      res.status(200).json({token})
    } else {
      res.status(404).json(`Invalid username or password`)
    }
  })
  .catch(error => {res.status(500).send(error)})
})


server.get('/api/users', protected, (req, res) => {
  db('users')
  .then(users => {
      res.json(users)
  })
  .catch(error => res.send(error))
});


server.post('/api/logout', (req, res) => {
  req.session.destroy(error => {
    if (error){
      res.status(500).send('failed to log out')
    } else {
      res.send('log out successful')
    }
  })
})

server.listen(PORT, () => console.log(`running on port ${PORT}`));
