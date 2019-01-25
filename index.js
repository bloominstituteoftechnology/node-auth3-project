const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const server = express();

//Router
const auth_router = require('./database/Routers/auth_router');

//PORT
const PORT = 5500;

//Server
server.use(express.json());
server.use(logger('dev'));
server.use(helmet());
server.use(cors());
server.use(auth_router);

//Initial get request
server.get('/', (req,res) => {res.json(`Server is and running`); });


//Server listen
server.listen(PORT, () => {
   console.log(`Server is running at localhost://${PORT}`);
});