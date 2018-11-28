// https://github.com/LambdaSchool/auth-ii/pull/273
require('dotenv').config();

const express = require('express');


const server = express();

const port = 3600;
server.listen(port, console.log(`\n ~~~ we can hear you on port ${port} ~~~\n`));