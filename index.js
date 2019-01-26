const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');

const db = require('./database/dbHelpers.js');

const server = express();
const port = 2222;

server.use(cors());
server.use(express.json());



server.listen(port, () => console.log(`Server up and running @ Port ${port}!`));