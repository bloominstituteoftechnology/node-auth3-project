const express = require('express');
const server = express()
const cors = require('cors')
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

server.use(cors(),helmet(),express.json());







server.listen(5500, () => console.log('\nrunning on port 5500\n'));