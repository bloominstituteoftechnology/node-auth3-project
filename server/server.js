const server = require('express')();
const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware').server;
const setupRoutes = require('./_config/routes');

setupMiddleware(server);
setupRoutes(server);

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
