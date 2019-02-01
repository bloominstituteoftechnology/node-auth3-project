const express = require('express');
const server = express();

server.use(express.json());

server.listen(9876, () => {console.log(`Hello, world!`)})