require('dotenv').config();

const server = require('./server');

const port = 6660;
server.listen(port, () => console.log(`\nServer is alive and kicking on port ${port}\n`))