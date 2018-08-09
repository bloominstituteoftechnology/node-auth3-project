const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const apiRoutes = require('./api/apiRoutes');

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use('/api', apiRoutes);

server.listen(8000, () => console.log('\n=== API running at port 8000 ===\n'));
