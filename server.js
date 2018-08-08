const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
  res.status(200).send('Yessss!')
})

server.listen(3000, () => {
  console.log('\n==== API Running on 3000 ======\n')
})