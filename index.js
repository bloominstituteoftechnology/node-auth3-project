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
    const payload = {
        username: user.username,
        department: user.department
    };
    
    const options = {
        expiresIn: '1h',
        jwtid: '12345',
    };

    return jwt.sign(payload, secret, options);
};

protect = (req, res, next) => {
    const token = req.headers.authorization;

    if(token){
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err){
                res.status(401).json({ message: "Invalid token!" })
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({ message: "Your token is missing!" })
    }
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