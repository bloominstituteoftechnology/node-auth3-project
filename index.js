const express = require('express');
const cors = require('cors');
// const bcrypt = require('bcryptjs');
const PORT = 1234

// const jwt = require('jsonwebtoken');

const server = express();


server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Server up and running!!!!');
});




server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
