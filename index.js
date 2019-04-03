const express = require('express');
const server = express();
const cors = require('cors');
const helmet= require('helmet');
const usersRouter = require('./router/users-router.js')
server.use(express.json());
server.use(helmet());
server.use(cors());

const login = require('./router/login.js')
const register = require('./router/register.js')
const logout =require('./router/logout.js')
const mds = require('./router/mds.js')
const restricted =require('./data/restricted-middleware.js')
server.use('/api/login', login);
server.use('/api/register', register);
server.use('/api/users', restricted, usersRouter);
server.use('/api/logout', logout);
server.use('/api/restricted/mds', mds);

server.get('/', (req,res) => {
  res.send("It is working");
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));