const express = require('express');
const configureMiddleware = require('./config/middleware.js');

const server = express();

configureMiddleware(server);

const port = 8000;
server.listen(port, () => console.log(`\nAPI running on port ${port}.\n`));