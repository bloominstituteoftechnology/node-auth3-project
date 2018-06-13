const express = require('express');

const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');

const server = express();

setupMiddleware(server);
setupRoutes(server);

const port = process.env.PORT || 5500
db.connect()
  .then(() => {
    console.log('\n... API Connected to mLabs Mongo Database ...\n');
    server.listen(port, () =>
      console.log(`\n=== API running on port ${port} ===\n`)
    );
  })
  .catch(err => {
    console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
  });
