const express = require('express');

// routes
const userRoutes = require('./routes/userRoutes.js');

const server = express();
const port = 5000;

server.use('/api/user/', userRoutes);

server.listen(port, () => { console.log(`\n=== Listening on port ${ port } ===`) });
