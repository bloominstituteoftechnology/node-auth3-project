const server = require('express')()
require('./api/middleware')(server)
require('./api/apiRouter')(server)

const port = 8000
server.listen(port, () => {
    console.log(`Server running on port ${port}\n`)
})

