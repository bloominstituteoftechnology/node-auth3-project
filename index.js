const express = require('express');
const cors = require('cors');

const server = express();
server.use(express.json());

//Sanity Check
server.get('/', (req, res) => {
    res.send('Its Alive!');
});

const port = 8000;
server.listen(port, function() {
    console.log(`\n ******* API running on port ${port} *******\n`);
});