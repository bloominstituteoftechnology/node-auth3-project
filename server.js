// Bring in Libraries
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Import Routers/Helpers
// const authRouter = require('./')
// const usersRouter = require('./')

// Set Server
const server = express();

// Server use
server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use('/api/auth', authRouter);
// server.use('/api/users', usersRouter);

// Server Test. Hello Msg.
server.get('/', (req, res) => {
    res.send("Hello from Patty. BE Week3-Day3 Project");
  });
  
  module.exports = server;
  