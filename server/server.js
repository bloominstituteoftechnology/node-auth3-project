const express = require('express'); // this imports express

const db = require('./_config/db'); // imports db from this filename
const setupMiddleware = require('./_config/middleware'); //imports middleware config from this filename
const setupRoutes = require('./_config/routes');//imports routes from this file

const server = express(); //calls our express server, server

setupMiddleware(server); //placeholder for middleware from the middleware file
setupRoutes(server); //placeholder for routes from the routes file

db.connectTo('authii') //connection to database from db.js
  .then(() => {
    console.log('\n... API Connected to authii Database ...\n');
    server.listen(5500, () =>
      console.log('\n=== API running on port 5500 ===\n')
    );
  })
  .catch(err => {
    console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
  });

  
