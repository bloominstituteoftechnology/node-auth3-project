//bring in dependencies
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const db = require('./database/dbConfig')
const jwt = require('jsonwebtoken');
require('dotenv').config();

//call the dependencies
const server = express();
server.use(express.json());
server.use(cors());
server.use(morgan());
server.use(helmet());

//test to make sure server works
server.get("/api", (req, res) => {
    res.send("Welcome To The Black Parade!");
});

//Token Generator for JWT 
const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1m',
    };
    return jwt.sign(payload, secret, options);
};

//middleware
const protected = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'invalid token' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'Where is your token?' })
    }
}
const checkRole = role => {
    return function (req, res, next) {
        if (req.decodedToken && req.decodedToken.roles.includes(role)) {
            next();
        } else {
            res.status(403).json({ message: 'You Don\'t Have Any Power Here!' })
        }
    }
}

//endpoints



//port
server.listen(3300, () => console.log('\nrunning on port 3300\n'));