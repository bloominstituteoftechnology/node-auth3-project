const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    cors = require('cors'),
    fs = require('fs'),
    users = require('./api/users'),
    auth = require('./api/auth'),
    { validateJwt } = require('./api/middleware/jwt');


const privateKey = fs.readFileSync(__dirname + '/rsa/private.key', 'utf8');

const app = express();

app
    .use(cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true
    }))
    .use(cookieParser())
    .use(bodyParser.json())
    .use('/users', validateJwt, users)
    .use('/auth', auth);


app.listen(8080);