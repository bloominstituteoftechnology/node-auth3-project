const express = require('express');
const server = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./data/usersModel');

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

passwordProtection = (password) => {
    if(password.length > 11){
        hashed = bcrypt.hashSync(password, 10);
        return hashed;
    } else {
        res.status(400).json({ message: "Password must be at least 12 characters long" })
    }
}


//ENDPOINTS
server.post('/api/register', (req, res) => {
    const user = req.body;

    if(user.username && user.department){
        user.password = passwordProtection(user.password);
        db.add(user)
            .then(response => {
                res.status(201).json({ message: "Account created successfully!" })
            })
            .catch(err => res.status(500).json({ message: "Unable to add new account." }))
    } else if (user.department) {
        res.status(400).json({ message: "New accounts require a username." })
    } else if (user.username) {
        res.status(400).json({ message: "New accounts require a department." })
    } else {
        res.status(400).json({ message: "New accounts require a username and department." })
    }
});

server.post('/api/login', (req, res) => {

});

server.get('/api/users', (req, res) => {

});



//SERVER

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});