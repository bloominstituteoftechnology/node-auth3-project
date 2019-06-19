// requiring dotenv to gain access to process.env.PORT
require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(`*Server running on http://localhost:${port}*`)
});
