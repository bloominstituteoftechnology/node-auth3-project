const express = require('express');
const server = express()
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const router = require ('./database/router/authRouter.js')
const port = 3300;


server.use(cors(), helmet(), morgan('tiny'), express.json());

server.use(router)

server.listen(port, () => console.log(`server is running on port ${port}`));