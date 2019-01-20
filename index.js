const express = require('express');
const server = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./data/usersModel'));

const PORT = process.env.PORT || 3500;

server.use(express.json());
server.use(cors());

//MIDDLEWARE

const secret = 'a very complex secret you could never guess';

generateToken = (user) => {

};

protect = (req, res, next) => {

};


//ENDPOINTS
server.post('/api/register', (req, res) => {

});

server.post('/api/login', (req, res) => {

});

server.get('/api/users', (req, res) => {

});



//SERVER

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});