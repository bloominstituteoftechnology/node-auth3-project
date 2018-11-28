const express = require('express');
const bcrypt = require('bcryptjs')
const session = require('express-session');

const server = express();

/*
POST to /api/login

GET to /api/users
    -returns an array of all users if authenticated

POST to /api/register
    -Creates a user in the database (hash password (bcrypt))
*/

server.listen(9000, console.log("Server Running on Port 9000"))
