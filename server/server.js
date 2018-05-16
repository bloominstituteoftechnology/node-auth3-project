const express = require('express');

const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');

const server = express();

db
  .connectTo('jwtauth')
  .then(() => console.log('\n... API Connected to jwtauth Database ...\n'))
  .catch(err => {
    console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
  });

setupMiddleware(server);
setupRoutes(server);

server.listen(5500, () => console.log('\n=== API running on port 5500 ===\n'));
