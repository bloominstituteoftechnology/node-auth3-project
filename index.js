const express = require('express');
const helmet = require('helmet');

const port = 9010;
const registerRoutes = require('./routes/registerRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const server = express();

server.use(helmet(), express.json());

server.use('/api/register', registerRoutes);
server.use('/api/login', loginRoutes);
server.use('/api/users', userRoutes);

server.listen(port, () =>
  console.log(`\n=== API running on port: ${port} ===\n`)
);
