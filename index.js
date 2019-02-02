const express = require('express')

const PORT = 5200
const server = express()

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})