const express = require('express');
const helmet = require('helmet');
const usersRouter = require('./database/routers/usersRouter.js');
const server = express();

const PORT = 5000;

server.use(helmet());
server.use(express.json());

server.use('/api/users', usersRouter);

server.get('/', (req, res) => res.send('<h3>API</h3>'));
server.listen(PORT, console.log('Listening on ' + PORT));