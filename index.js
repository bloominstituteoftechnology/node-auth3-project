

//== Authentication II Server ==================================================

//-- Dependencies --------------------------------
require('dotenv').config();
const express = require('express');
const cors    = require('cors'   );
const config               = require('./config.js'               );
const routerAuthentication = require('./router_authentication.js');

//-- Configure Server ----------------------------
const server = express();
server.listen(process.env.PORT, () => {
    console.log(config.SERVER_MESSAGE_LISTEN);
});

//-- Middleware ----------------------------------
server.use(cors()        );
server.use(express.json());

//-- Routing -------------------------------------
server.use(config.URL_AUTHENTICATION, routerAuthentication);
