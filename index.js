const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
server.use(helmet());
server.use(cors());
server.use(express.json());
const db = require('./data/dbConfig.js'); // database configuration file location

// CONFIG: server settings
const serverPort = 7100; // server port
const serverName = `auth-i`; // Name of server to display at "/" endpoint 
const serverPullRequest = `https://github.com/LambdaSchool/auth-ii/pull/215`;

// CONFIG: endpoint routing
// const users = require('./data/routes/usersRoutes');
// server.use('/api/users', users);

// CONFIG: Models
const users = require('./data/models/usersModels');

// ENDPOINTS
server.get('/', (req, res) => { // sanity check root endpoint
  res.send(`${serverName} running on port ${serverPort}<br>More information: <a href="${serverPullRequest}">GitHub Repo</a>`);
});

const jwtSecret = 'this.is.a.secret.to.everyboday'; // Secret encryption key that won't allow malicious use of the cookie

function generateToken(user) { // Generates token for cookie

  const jwtPayload = { // payload sets the information that will be sent through the cookie (NOTE SECURE)
    ...user,
    hello: `${user}`,
    role: 'admin'
  };

  jwtOptions = {
    expiresIn: '20s'
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

server.post('/api/login', (req, res) => { // api login endpoint
  const creds = req.body; // store body of post request in credentials variable
  db('users').where({ username: creds.username }) // search users db for username
    .first() // return first result
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user); // LOOK BACK AT THIS (might change to username)
        // check if user exists and user bcrypt hashed password with submitted password
        res.status(200).json({ message: `Authentication success. Welcome ${user.username}.`, token })
      } else {
        res.status(401).json({ message: 'Authentication failed.' })
      }
    })
    .catch(err => res.status(500).json({ err }));
});

server.post('/api/register', (req, res) => { // api register endpoint
  const credentials = req.body; // store body of post request in credentials variable
  const hash = bcrypt.hashSync(credentials.password, 14) // hash the password
  credentials.password = hash; // store hashed password on the credentials object
  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/api/users', protected, (req, res) => { // api user list endpoint
  console.log('\n** decoded token information **\n', req.decodedToken);
  users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.get('/api/users/:id', protected, (req, res) => { // view one user based off id and related actions
  const { id } = req.params;
  users.find(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'ERROR: User not found.' });
      }
    })
    .catch(err => res.json(err));
})

server.get('/api/logout', (req, res) => { // endpoint to logout of session
  if (err) {
    res.send("Logout failed")
  } else {
    res.send("Logout success")
  }
});

function protected(req, res, next) { // send cookie back in header because any device will have a hard time to pick up the header rather than the body.
  const token = req.headers.authorization; // standard header (authorization)
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // token verification failed
        res.status(401).json({ message: `You shall not pass!` });
      } else {
        // token is valid
        req.decodedToken = decodedToken; // any sub-sequent middleware of route handlers have access to this
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' })
  }
}


server.listen(serverPort, () => console.log(`## ${serverName} running on port ${serverPort} ##`));