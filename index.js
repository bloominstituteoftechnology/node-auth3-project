const server = require('./server');

const port = process.env.PORT || 5500;
server.listen(port, () => {
    console.log(`Server listening ${port}`)
})