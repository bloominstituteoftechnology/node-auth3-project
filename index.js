const express = require('express');

const server = express();
const port = 5000;

server.get('/', (req, res) => {
	return res.send('Server is working.');
});

server.listen(port, () => { console.log(`\n=== Listening on port ${ port } ===`) });
