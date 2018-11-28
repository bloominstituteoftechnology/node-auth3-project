const server = require('express')();
const errorHandler = require('./util/errorHandler')

require('./middleware')(server)
require('./api/routeApis')(server);

server.use(errorHandler);

server.listen(9000, () => console.log('Server is UP at 9000'));

