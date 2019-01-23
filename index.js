//create express server
const express = require('express');
const server = express();

//3rd party & built in middleware
server.use(express.json());

//test route to check server
server.get('/', (req, res) =>{
    res.json('Working!!');
})

//Listener
const PORT = 4000;
server.listen(PORT, ()=>{
    console.log(`Server up and running on port ${PORT}`);
})