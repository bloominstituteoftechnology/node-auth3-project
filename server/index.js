const express = require('express');
const helmet = require( 'helmet' );
const cors = require( 'cors' );
const mongoose = require( 'mongoose' );
const bodyparser = require( 'body-parser' );
const session = require( 'express-session' );
const axios = require( 'axios' );
const bcrypt = require( 'bcrypt' );
const cookieparser = require( 'cookie-parser' );

const db = require('./database/db.js');
const setupMiddleware = require('./database/middleware/index.js');
const setupRoutes = require('./database/routes/index.js');

const server = express();
const port = process.env.PORT || 777;
const databaseName = 'authiiproj';
setupMiddleware(server);
setupRoutes(server);

db.connectTo( `${ databaseName }`)
  .then(() => {
    console.log(`\n... API Hooked Up To The ${databaseName} Database ...\n`);
    server.listen(port, () =>
      console.log(`\n=== API running on port ${ port } ===\n`)
    );
  })
  .catch(err => {
    console.log("\n*** ERROR Connecting to MongoDB! Don't Panic! Try turning it off And Back On Again. ***\n", err);
  });
