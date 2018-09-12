const express = require('express');
const server = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

server.use(express.json());
server.use(cors());

const secret = 'lambda-school-fsw12';


generateToken = user => {
    const payload = {
        username: user.username,
        department: user.department,
    }
    const options = {
        expiresIn: '4h',
        jwtid: '12345',
    }
    return jwt.sign(payload, secret, options);
}






//Listen
const port = 8000;
server.listen( port, console.log(`===Server is running on port ${port}===`));
