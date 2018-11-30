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

const secret = process.env.JWT_SECRET;
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
    const options = {
        expiresIn: '1m',
    };
    return jwt.sign(payload, secret, options);
};

//middleware
function authenticate(req, res, next) {
    const { authentication: token } = req.headers;
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Authentication failed.' });
        } else {
            req.decodedToken = decoded
            //req.locals = { authorization: decoded };
            next();
        }
    });
}

server.use('/api/restricted/', authenticate);

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


//register a new user
server.post('/api/register', (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 4);  //in real life make this like 14 instead of 4, but for speed of testing purposes we'll leave as 4 for now.
    creds.password = hash;
    db('users')
        .insert(creds)
        .then(id => {
            res.status(201).json(username); //might need to change id to username
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

//login in a current user
server.post('/api/login', (req, res) => {
    const creds = req.body;
    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            console.log(creds.password, user)
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                console.log("inside")
                const token = generateToken(user);
                res.status(200).json({ token })
            } else {
                res.status(401).json({ message: 'go away' })
            }
        })
        .catch(err => {
            console.log(error)
            res.json(err)
        }
        )
});

//get info on users
server.get('/api/restricted/users', checkDepartment('sales'), (req, res) => {
    db('users')
        .select('id', 'username', 'password') //in real life becareful not to send the password
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

//authenticate user
server.get('/api/restricted/authenticate', (req, res) => {
    if (req.locals.authorization) {
        res.status(200).json(req.locals.authorization);
    }
});


//port
server.listen(3300, () => console.log('\nrunning on port 3300\n'));