const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const apiRoutes = require('./api');


const server = express();
server.use(express.json());
server.use(cors({}));

server.use('/api', apiRoutes);

const PORT = 8000;
server.listen(PORT, () => console.log(`<= SERVER = PORT: ${PORT} = LISTENING =>`));
