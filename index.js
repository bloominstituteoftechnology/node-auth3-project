const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const server = express();
const PORT = 5500;

server.use(express.json());
server.use(cors());
server.get('/', (req,res) => {
   res.json(`Server is and running`);
})

server.listen(PORT, () => {
   console.log(`Server is running at localhost://${PORT}`);
})