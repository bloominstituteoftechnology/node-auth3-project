const express = require('express');
const cors = require('cors');

const server = express();
const api = require('./routes');

server.use(cors({ credentials: true, 
    origin: 'http://localhost:3000'}));

server.use(express.json());// this needs to be .json()

server.use('/api', api);

server.get('/', (req, res) => {
    console.log(req.body)
    res.status(200).send('Auth-ii -- Server is running.')
});

const PORT = 4400;

server.listen(PORT, () => console.log(`\n== Server running on port ${PORT} ==\n`))