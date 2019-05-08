require('dotenv').config(); //Environmental variables

const server = require('./server.js');
const port = process.env.PORT || 5000;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
  });