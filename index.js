require('dotenv').config();
const express = require('express');
const cors = require('cors');


const server = express();

server.use(express.json());
server.use(cors());


server.listen(3300, () => console.log('\nServer listening on port 3300\n'))
