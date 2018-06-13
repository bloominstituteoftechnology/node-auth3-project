const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const jwt = require('jsonwebtoken');
const User = require('./users/User.js');

const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');

const server = express();
//const secret = "toss me, but don't tell the elf!";

const corsOptions = {
  origin: 'http://localhost:3000', // allow only the React application to connect 
  credentials: true,// sets the Access-Control-Allow-Credentials CORS header
};

//server.use(express.json());
//server.use(cors(corsOptions));

setupMiddleware(server);
setupRoutes(server);








const port = process.env.PORT || 5500;//process is a global variable that has info on ports

db.connectTo('authii')
  .then(() => {
    console.log('\n... API Connected to authii Database ...\n');
    server.listen(5500, () =>
      console.log('\n=== API running on port 5500 ===\n')
    );
  })
  .catch(err => {
    console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
  });
