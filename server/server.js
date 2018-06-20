const express = require('express');
const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');
const server = express();


setupMiddleware(server);
setupRoutes(server);

db.connectTo('authii')
  .then(() => {
    console.log('\n=== API connected to authii database ===\n');
    server.listen(5500, () => {
      console.log('\n === API running on port 5500 ===\n');
    });
  })
  .catch(err => {
    console.log('\n *** Error connecting to database, is mongo running? ***\n', err);
  });