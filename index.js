const express = require('express');
const bcrypt = require('bcryptjs')
const session = require('express-session');

const server = express();

server.listen(9000, console.log("Server Running on Port 9000"))
