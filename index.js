const express = require('express');
const cors = require('cors');

const loginRouter = require('./routers/loginRouter.js');
const usersRouter = require('./routers/usersRouter.js');
const registerRouter = require('./routers/registerRouter.js');

const server = express(); // don't forget to use this before your routers ORDER MATTERS!!!!!
server.use(express.json());
server.use(cors());

server.use('/api/login', loginRouter);
server.use('/api/users', usersRouter);
server.use('/api/register', registerRouter);



server.get('/', (req, res) => {
  res.send('Its Alive!');
});

server.listen(8300, () => console.log('\nrunning on port 8300\n'));