const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./data/dbConfig');

const server = express();

server.use(express.json());
server.use(cors());

// configure jwt
const secret = 'ems secret key!';


function generateToken(user) {
  const payload = {
    name: user.name,
    password: user.password,
    department: user.password
  };

  const options = {
    expiresIn: '1h',
    jwtid: 'whitehairsucks',
  };

  return jwt.sign(payload, secret, options);
}

function restricted(req, res, next) {
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

}


//**************Home Endpoint****************
server.get('/', (req, res) => {
  res.send('Hello World');
});


server.get('/setname', (req, res) => {
  req.session.name = '';
  res.send('User Info retrieved');
});

server.get('/getname', (req, res) => {
  const name = req.session.name;
  res.send(`hello ${req.session.name}`);
});

//********GET All USERS ENDPOINT*********************
server.get('/users', restricted, (req, res) => {
    db('users').select('name', 'password', 'department')
    .then(response => {
            res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json('Sorry, you do not have access');
    })
});

//********CREATE REGISTER ENDPOINTS*********************
server.post('/register', function(req, res) {
  const user = req.body;

  // hash password
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db('users')
    .insert(user)
    .then(function(ids) {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(user => {
          // generate the token
          const token = generateToken(user);
          // req.session.username = user.username;

          // attach the token to the response
          res.status(201).json(token);
        });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});


//********CREATE LOGIN ENDPOINTS*********************
server.post('/api/login', (req, res) => {
	const identity = req.body;

	db('users')
		.where({ name: identity.name})
		.first()
		.then(function(user){
			const passwordsMatch = bcrypt.compareSync(
			  	identity.password, user.password
			);
				if (user && passwordsMatch) {
					 const token = generateToken(user);
					res.send(token);
				} else {
					return res.status(401).json({ error: 'Opps..Login unsuccessful, Please try again'});
				}
		})
			.catch(function(error) {
				res.send(500).json({ error });
			})
});

//********CREATE LOGOUT ENDPOINT*********************
server.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('Logout Session Unsuccessful');
      } else {
        res.send('You are successfully logged out');
      }
    });
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
