const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const db = require('./data/db');

const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));
server.use(helmet());
server.use(morgan('dev'));

function sendError(code, message, error) {
    return {
        code,
        message,
        errMsg: error
    }
};

function isRegisterValid(userObject) {
    if (userObject.hasOwnProperty('username'), 
        userObject.hasOwnProperty('password'), 
        userObject.hasOwnProperty('deparment'),
        userObject.username,
        userObject.password,
        userObject.department) return true;
    return false;
}

function isLoginValid(userObject) {
    if (userObject.hasOwnProperty('username'), 
        userObject.hasOwnProperty('password'), 
        userObject.username,
        userObject.password) return true;
    return false;
}

const secret = '1029384756';

function generateToken(user) {
    const payload = {
        "username": user.username
    };

    const options = {
        expiresIn: '1h',
        jwtid: '8728391'
      };

    return jwt.sign(payload, secret, options)
}

function protected(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                return next(sendError(401, "You're not authorize to view this content.", "Invalid token."))
            }
            req.jwtToken = decodedToken;
            next()
        })
    } else {
        return next(sendError(401, "You're not authorize to view this content.", "No token found."))
    }
}

//endpoint for main page 
server.get('/api/users', protected, async (req, res, next) => {
    const username = req.jwtToken.username;
    try {
        const response = await db.get(username);
        res.status(200).json(response);
    } catch (error) {
        next(sendError(401, "Failed to retrieve users information.", error.message))
    }
});

//endpoint for register page
server.post('/api/signup', async (req, res, next) => {
    if (!isRegisterValid(req.body)) {
        return next(sendError(400, 'Failed to sign up.', 'Please provide username, password, and department.'))
    }

    const hash = bcrypt.hashSync(req.body.password, 12);
    const user = {
        ...req.body,
        password: hash
    }

    try {
        const response = await db.register(user);
        const token = generateToken(user);
        res.status(201).send(token);
    } catch (error) {
        next(sendError(500, 'Failed to sign up.', error.message))
    }
});

//endpoint for login page
server.post('/api/signin', async (req, res, next) => {
    if (!isLoginValid(req.body)) {
        return next(sendError(400, 'Failed to sign in.', 'Please provide username and password.'))
    }

    const user = req.body;

    try {
        const response = await db.login(user);
        const match = bcrypt.compareSync(String(req.body.password), response);
        if (match) {
            const token = generateToken(user);
            res.status(200).send(token);
        } else {
            next(sendError(400, 'Failed to sign in.', 'Incorect credentials.'));
        }
    } catch (error) {
        next(sendError(400, 'Failed to sign in.', error.message));
    }
})

//Error Handler
server.use((error, req, res, next) => {
    if (error.errMsg.includes('UNIQUE')) {
        res.status(error.code).json({ message: error.message, error: 'This username already exists. Please choose another username.' })
    } else {
        res.status(error.code).json({ message: error.message, error: error.errMsg })
    }
})

server.use(function (req, res, next) {
    res.status(404).send("Page does not exist.")
  })

const port = 8000;
server.listen(port, console.log(`=== WebAPI is listening at port ${port} ===`))