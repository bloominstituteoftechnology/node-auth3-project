const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const db = require('./database/dbHelpers.js');

const server = express();
const port = 2222;

server.use(cors());
server.use(express.json());
// server.use(session({
//     name: 'notsession',
//     secret: 'qweruiopasdfjkl;zxcvm,./',
//     cookie: {
//         maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day IN MILLISECONDS
//     },
//     httpOnly: true,
//     resave: false,
//     saveUninitialized: false,
// }));

const secret = 'secrettest'; //USUALLY comes from env. variable (hardcoded for practice..)

function generateToken(user) {
    const payload = {
        username: user.username,
        department: user.department,
    };
    const options = {
        expiresIn: '1h', 
        jwtid: '12345',
    }
    return token = jwt.sign(payload, secret, options);
}
function protected(req, res, next) {
    //read the token string from the authorization header
    const token = req.headers.authorization;
    if(token){ //check that token is being sent to us

        //verify the token
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                //token is invalid
                res.status(401).json({message: 'invalid token. access denied!'});
            } else {
                //token is valid!
                console.log(decodedToken);
                req.username = decodedToken.username;
                next();
            }
        })
    } else {
        res.status(422).json({message: 'no token provided'});
    }
}

server.post('/api/register', (req, res) => {
    // const user = req.body;
    req.body.password = bcryptjs.hashSync(req.body.password, 16);
    db.insert(req.body)
        .then(response => {
            // console.log(response);
            // console.log(generateToken(req.body));
            const token = generateToken(req.body);
            res.status(201).json({id: response[0], token });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({err: 'Problem creating your account. Please try again.'});
        });
});
server.post('/api/login', (req, res) => {
    db.findByUser(req.body.username)
        .then(response => {
            // console.log(req.body);
            // console.log(response);
            // console.log(req.session);
            console.log('success!');
            if((req.body.username === response[0].username) && bcryptjs.compareSync(req.body.password, response[0].password)){
                // req.session.userID = response[0].id;
                const token = generateToken(req.body);
                res.status(200).json(`Hello ${req.body.username}. You have successfully logged in! Your JWT is Token: ${token}`);
            } else {
                res.status(404).json({err: "invalid username OR password. please try again."})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({err: error});
        });
});

server.get('/api/users', protected, (req, res) => {
    db.selectAllUsers()
        .then(response => {
            res.status(200).json({UserInfo: response});
        })
        .catch(error => {
            console.log(error);
            res.json({err: 'unable to load userinfo. please try again.'});
        });
});

server.listen(port, () => console.log(`Server up and running @ Port ${port}!`));