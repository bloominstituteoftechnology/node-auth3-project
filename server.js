const { Router, urlencoded } = require('express');

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/user-router.js');

const server = Router();

server.use(urlencoded({extended: false}));

server.use('/auth', authRouter);
server.use('/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;