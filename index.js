require('dotenv').config();
const server = require('./api/server.js');
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`==== SERVER LISTENING ON PORT ${PORT} ====`);
});
