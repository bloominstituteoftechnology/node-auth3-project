const server = require('./api/server');

const port = process.env.PORT || 5000;

server.listen(port, () => `Server is listening on port ${port}`);
