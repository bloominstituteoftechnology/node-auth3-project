const express = require('express');
const server = express();

server.use(express.json());
server.use('/api', require('./api'));

const port = 9000;
server.listen(port, () => `Server listening on port ${port}.`);
