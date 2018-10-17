const express = require('express');
const applyGlobalMiddleware = require('./config/middleware/global.js');

const server = express();
const port = 5000;

applyGlobalMiddleware(server);

const userRoutes = require('./routes/userRoutes.js');

server.use('/api/users', userRoutes);

server.listen(port, () => { console.log(`\n=== Listening on port ${ port } ===`) });
