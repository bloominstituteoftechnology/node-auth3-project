const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./routers/auths');
const usersRouter = require('./routers/user');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', authRouter);
server.use('/api', usersRouter);

server.get('/', (req, res) => {
  res.send("It's running smoothly");
});

module.exports = server;