// dependencies
const express = require('express');
// express
const server = express();
// middleware
server.use(express.json());

// port
const port = 7000;
server.listen(port, () => console.log(`___ server listening at localhost ${port} ___`));