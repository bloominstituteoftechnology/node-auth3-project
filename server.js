const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const knex = require('knex');
const db = require('./database/db');

const cors = require('cors');
const bcrypt = require('bcryptjs');

const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const port = 8000;
const server = express();

server.use (express.json());
server.use(morgan('dev'));
server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


server.get('/', (req, res) => {

  res.send('<h1>Authentication Week:  auth-ii</h1>   <h3>Sam Khaled</h3>');
});

// server.get('/api/users', (req, res) => {
// 	db('users')
// 		.then(users => {
// 			res.status(200).json(users);
// 		})
// 		.catch(error => {
// 			res.status(500).json(error);
// 		})
// });

server.get('/api/users',expressjwt({secret: 'expressjwtsecret'}),
  
  function(req, res, next) {
    if (!req.user) return res.status(401).json({error: 'Missing a valid token'});
    next();        //res.status(200).json({message: 'success'});
  });


server.post('/api/register', (req, res)=> {

        const credentials = req.body;
        const hash = bcrypt.hashSync(credentials.password, 10);  //hasing password using bcrypt
        credentials.password = hash;


        db('users')
        .insert(credentials)

        .then(ids =>{

                db('users')
                .where('id', ids[0])
                .first()
                .then(user => {

    const token = generateToken(user);
    
                res.status(200).json(user);
                })
        })

.catch(err =>{
        if(err.message.includes('UNIQUE constraint failed: users.username')) res.status(500).json({errorMessage:"username already taken, use another username"});  //checking if the username is alread taken

        else res.status(500).json(err);
        });
})


const secret = 'expressjwtsecret';

function generateToken(user) {
  const payload = {
    sub: user.id,
  };

  const options = {
    expiresIn: '1h',
    jwtid: 'abc123ABC',
  };

  return jwt.sign(payload, secret, options);
}

function protected (req, res, next){
  const token = req.headers.authorization;

  if (token) {
     jwt.verify(token, secret, (err, decodedToken) => {
        
  if (err) {
           return res.status(401).json({ error: 'Invalid token, you shall not pass!' });
        }

      req.jwtToken = decodedToken;
      next();
    });

  } else {
    return res.status(401).json({ error: 'missing token, you shall not pass!' });
  }
}



server.post('/api/login', function(req, res) {
  const credentials = req.body;

  db('users')
    .where({ username: credentials.username })
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        // generating the token
        
  const token = generateToken(user);

        //token attached to the response
        
    res.send(token);
      } else {
        return res.status(401).json({ error: 'Incorrect UserID or Password' });
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});


// server.get('/api/users', (req, res) => {
//   console.log('token', req.jwtToken);

//   db('users')
//     .then(users => {
//       res.json(users);
//     })
    
//     .catch(err => res.send(err));
// });









// server.listen(port, () => console.log(`\n Server is running on http://localhost:${port} === \n`));
server.listen(port, function() {
	console.log(`\n Server is running on http://localhost:${port} === \n`);
});