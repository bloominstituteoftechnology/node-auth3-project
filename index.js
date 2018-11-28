const expres = require('express')
const bcrypt = require('bcryptjs')
const db = require('./data/db')
const server = express();

server.use(express.json());

const port = 9000;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
    
});