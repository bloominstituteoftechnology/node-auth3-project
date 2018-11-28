const server = require('./server/server.js');

const port = 3900;

server.listen(port, () =>
    console.log(`\nrunning on port ${port}\n`));