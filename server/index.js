const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./data/dbConfig');
const morgan = require('morgan');
const cors = require('cors');
const port = 8000;
const server = express();
const authRoutes = require('./authenticate/authRoutes');

server.use(express.json());
server.use(morgan('tiny'));
server.use(cors());

server.use('/api', authRoutes);

server.listen(port, () => {
  console.log(`\n=== API running on port ${port} ===\n`);
});
