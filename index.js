const server = require('./server');

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`\n Listening on port ${PORT} \n`))