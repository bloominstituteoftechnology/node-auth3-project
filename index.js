const express = require('express');
const bcryptjs = require('bcryptjs');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const server = express();
const PORT = 5500;

server.use(express.json());
server.use(logger('dev'));
server.use(cors());
server.get('/', (req,res) => {
   res.json(`Server is and running`);
})

server.listen(PORT, () => {
   console.log(`Server is running at localhost://${PORT}`);
})