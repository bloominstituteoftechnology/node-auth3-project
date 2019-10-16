const server = require('./server.js');

const port = 5252;

server.listen(port, () => console.log(`server listening on ${port}`));