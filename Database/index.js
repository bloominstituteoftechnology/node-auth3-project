const express = require('express');
const db = require('./data/db.js');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// AUTH2 REGISTER
server.post('/api/register', (req, res) => {
    const register = req.body;

    const hash = bcrypt.hashSync(register.password, 14);

    register.password = hash;

    db.insert(register)
     .into('project')
     .then(ids => ({ id: ids[0] }))
     .then(response => {
         const token = generateToken(response);
         res.status(201).json(response[0]);
     })
     .catch(err => {res.status(500).json(err)});
})

function generateToken(register) {
    const payload = {
      username: register.username,
    };
  
    const options = {
      expiresIn: '1h',
      jwtid: '8728391',
    };
  
    return jwt.sign(payload, secret, options);
  }
  
  function protected(req, res, next) {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          return res
            .status(401)
            .json({ error: 'you shall not pass!! - token invalid' });
        }
  
        req.jwtToken = decodedToken;
        next();
      });
    } else {
      return res.status(401).json({ error: 'you shall not pass!! - no token' });
    }
  

// AUTH2 LOGIN
server.post('/api/login', function(req, res) {
    const credentials = req.body;
  
    db('project')
      .where({ username: credentials.username })
      .first()
      .then(function(user) {
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          const token = generateToken(user);
          res.send(token);
        } else {
          return res.status(401).json({ error: 'Incorrect credentials' });
        }
      })
      .catch(function(error) {
        res.status(500).json({ error });
      });
  });

// AUTH2 GET.USERS
server.get('/api/users', protected, (req, res) => {
    console.log('token', req.jwtToken);
  
    db('project')
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

// AUTH LOGOUT  
server.get('/api/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.send('error');
        } else {
          res.send('good bye');
        }
      });
    }
  });


const port = 8000;
server.listen(port, () => {
    console.log(`\n === Auth API listening on http://localhost:${port} ===\n`);
});