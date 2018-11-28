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
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: ['sales', 'engineering', 'management'],
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1m',
    };
    return jwt.sign(payload, secret, options);
};

//middleware
function protected(req, res, next) {
    // token is normally sent in the the Authorization header
    const token = req.headers.authorization;
    if (token) {
        // is it valid
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                // token is invalid
                res.status(401).json({ message: 'invalid token' });
            } else {
                //token is accepted
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        // bounced
        res.status(401).json({ message: 'Where is your token?' })
    }
}
function checkDepartment(department) {
    return function (req, res, next) {
        if (req.decodedToken && req.decodedToken.department.includes(department)) {
            next();
        } else {
            res.status(403).json({ message: 'You Don\'t Have Any Power Here!' })
        }
    }
}

//endpoints

server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 4);  //in real life make this like 14 instead of 4, but for speed of testing purposes we'll leave as 4 for now.
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => res.json(err));
})
server.post('/api/login', (req, res) => {
    const creds = req.body;
    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: 'hey we know you!', token })
            } else {
                res.status(401).json({ message: 'go away' })
            }
        })
        .catch(err => res.json(err));
});

server.get('/api/users', protected, checkDepartment('sales'), (req, res) => {
    db('users')
        .select('id', 'username', 'password') //in real life becareful not to send the password
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});


//port
server.listen(3300, () => console.log('\nrunning on port 3300\n'));