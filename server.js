
const express = require('express');

const cors = require('cors')

const user = require('./routes/user')

const helmet = require('helmet');

// const logger = require('./custom-middleware/logger')



const morgan = require ('morgan')

const server = express();



server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
// server.use(logger());


server.get('/', async (req, res) => {
  res.send(`
    <h2>Lambda Project API</h2>
    <p>Welcome to the Lambda Project API</p>
    `);
});
server.use('/api/user', user);

module.exports = server;
