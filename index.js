require('dotenv').config(); //load .env vars

const server = require('./api/server.js');

const port = process.env.PORT || 5006;

server.listen(port, () => {
    console.log(`\n ** Server listening on port ${port}** \n`);
});