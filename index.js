const server = require('./server.js')

const port = 9000

server.listen(port, () => console.log(`server listening on port ${port}`))