const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const apiRoutes = require('./api/apiRoutes');
const server = express();
const PORT = 8000;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api', apiRoutes);

server.get('/', (req, res) => {
  res.send('The auth server is running...')
});

server.listen(PORT, () => console.log(`\n==== API running on port ${PORT} ====\n`));