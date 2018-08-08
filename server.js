const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();

server.use(express.json());

server.use(morgan('dev'));


server.get('/', (req, res)=> {
	res.send('Testing123...');
});



server.listen(4003, ()=> console.log('API running on port 4003'));
