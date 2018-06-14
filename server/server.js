const express = require('express');

const db = require('./_config/db');
const helmet = require('helmet');
const mongoose = require('mongoose');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');

const server = express();

server.use(helmet());
server.use(express.json());

setupMiddleware(server);
setupRoutes(server);

mongoose
  .connect(db)
  .then(() => {
    console.log('\n... API Connected to authii Database ...\n');
    server.listen(5500, () =>
      console.log('\n=== API running on port 5000 ===\n')
    );
  })
  .catch(err => {
    console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
  });

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n\nAPI running on http://localhost:${port}`)
);
