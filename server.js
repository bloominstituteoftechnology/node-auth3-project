const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./auth/db');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Up and running...')
})

const secret = 'snoop doggy dogg';

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
    jwtid: '217961010',
  };

  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization; // grab the header

  if (token) { // check for token
    jwt.verify(token, secret, (err, decodedToken) => { // check if it's valid (err = didn't decode, decodedToken = success)
      if (err) { // if it didn't validate correctly
        return res.status(401).json({ error: 'you shall not pass!! - token invalid' });
      }

      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' }); // return an error
  }
};

server.get('/users', protected, (req, res) => {
    console.log('token', req.jwtToken); // add a console.log of the token and the decoded token
    db('users')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.status(500).json(err));
});

server.post('/register', (req, res) => {

	const user = req.body;
	const hash = bcrypt.hashSync(user.password, 10); // Auto-gen a salt and hash
	user.password = hash; // store hash in password DB

    db('users') // go into users
        .insert(user) // insert new users
        .then(ids => {
            db('users')
                .where({ id: ids[0] }) // find the appropriate user
                .first() // the first one
                .then(user => {
                const token = generateToken(user); // generate the token
                    res.status(201).json(token); // return new token
                });
        })
        .catch(err => {
            res.status(500).json(err); // throw err if it fails
        });
});

server.post('/login', (req, res) => {
	const credentials = req.body;

    db('users')
        .where({username: credentials.username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = generateToken(user);
                res.send(token)
            } else {
                res.status(401).json({ error: 'You shall not pass'})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

const port = 8000;

server.listen(port, function() {
    console.log(`\n--- Web API Listening on http://localhost:${port} ---\n`);
})