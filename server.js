const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const db = require('./data/db');

const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000', credentials: true}));
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

//endpoint for main page 
server.get('/', (req, res) => {
    res.status(200).send('Welcome!')
});

//endpoint for register page
server.post('/api/register', async (req, res, next) => {
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
        res.status(201).json(response);
    } catch (error) {
        next(sendError(500, 'Failed to sign up.', error.message))
    }
});


//endpoint for login page

//Error Handler
server.use((error, req, res, next) => {
    res.status(error.code).json({ message: error.message, error: error.errMsg })
})

server.use(function (req, res, next) {
    res.status(404).send("Page does not exist.")
  })

const port = 8000;
server.listen(port, console.log(`=== WebAPI is listening at port ${port} ===`))