

//== Authentication II Server ==================================================

//-- Dependencies --------------------------------
require('dotenv').config();
const express = require('express');
const config = require('./config.js');

//-- Configure Server ----------------------------
const server = express();
server.listen(process.env.PORT, () => {
    console.log(config.SERVER_MESSAGE_LISTEN);
});

//-- Middleware ----------------------------------

//-- Routing -------------------------------------
