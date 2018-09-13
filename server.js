const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const server = express();
const port = 3300;

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

server.use(express.json());
server.use(cors());
server.use(helmet());

const secret = 'seecreeettt';


function generateToken(user) {
  const payload = {
    username: user.username,
    roleId: user.roleId
  };
  const options = {
    expiresIn: '1h',
    jwtid: '12345'
  };
  return jwt.sign(payload, secret, options);
}


function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // keep track if there is an error, a log of users trying to log in with invalid token
        res.status(401).json({ message: 'Invalid Token' });
      } else {
        console.log(decodedToken);
        req.user = { username: decodedToken.username, roleId: decodedToken.roleId };
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
}


server.get('/', (req, res) => {
  res.send('hello');
});


server.get('/api/users', (req, res) => {
  db('users')
  .select('username as User', 'role_name as Role', 'department_name as Department')
  .join('roles', 'users.roleId', 'roles.roleId')
  .join('departments', 'departments.departmentId', 'roles.departmentId')
  .then(users => {
    console.log(users)
    res.status(200).json(users)
  })
  .catch(err => console.log(err));
});


// proper join for roles in department
server.get('/api/departments', (req, res) => {
  db('departments')
  .select('department_name as Department', 'role_name as Roles')
  .join('roles', 'departments.departmentId', 'roles.departmentId')
  .then(departments => {
    res.status(200).json(departments)
  })
  .catch(err => console.log(err));
});


server.get('/api/roles', (req, res) => {
  db('roles')
  .select('role_name as Role', 'department_name as Department')
  .join('departments', 'roles.departmentId', 'departments.departmentId')
  .then(roles => {
    res.status(200).json(roles)
  })
  .catch(err => console.log(err));
});



/* === === === */



server.post('/api/register', (req, res) => {

  !req.body.username || !req.body.password || !req.body.roleId ?
  res.status(400).json({message: 'You need a username AND password AND role'})
  :
  null

  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  creds.roleId = parseInt(creds.roleId, 10);
  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      db('users')
        .where({ userId: id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.userId, token });
        })
        .catch(err => res.status(500).send('err 1'));
    })
    .catch(err => res.status(500).send('err 2'));
});


server.post('/api/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(err => res.status(500).send(err));
});


server.get('/api/protected/users', protected, (req, res) => {
  const { roleId } = req.user;
  db('users')
    .select('username as User', 'role_name as Role', 'department_name as Department', 'users.roleId')
    .join('roles', 'users.roleId', 'roles.roleId')
    .join('departments', 'departments.departmentId', 'roles.departmentId')  
    //.where({roleId})
    .then(users => {
      console.log(users)
      let matchedUsers = [];
      matchedUsers = users.filter(users => {
        return users.roleId === roleId;
      });
      res.json(matchedUsers);
    })
    .catch(err => res.send(err));
});


server.listen(port, () => console.log(`=== Listening on port ${port} ===`));
