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


server.get('/', (req, res) => {
  res.send('hello');
});


server.get('/api/users', (req, res) => {
  db('users')
  .select('username as User', 'role_name as Role', 'department_name as Department')
  .join('roles', 'users.roleId', 'roles.roleId')
  .join('departments', 'departments.departmentId', 'roles.departmentId')
  .then(users => {
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




server.listen(port, () => console.log(`=== Listening on port ${port} ===`));
