// Import node modules
const express = require('express');
const helmet = require('helmet');

const usersRoutes = require('./routes/usersRoutes.js');

const server = express();// creates the server

// Add GLOBAL MIDDLEWARE
server.use(helmet());
server.use(express.json());

//Add home route
server.get('/', (req, res) => {
  res.send('Server is up and running!');
});

server.use('/api', usersRoutes);

server.listen(4000, () => console.log('\n====running on port 4000====\n'));