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

allFields = (req, res, next) => {
    const user = req.body;
    if(user.username && user.password && user.department) {
        next();        
    } else if (user.username && user.password){
        res.status(400).json({ message: "New accounts require a department." })
    } else if (user.username && user.department){
        res.status(400).json({ message: "New accounts require a password." })
    } else if (user.password & user.department){
        res.status(400).json({ message: "New accounts require a username." })
    } else {
        res.status(400).json({ message: "New accounts need a username, password and department." })
    }
}

loginCheck = (req, res, next) => {
    const user = req.body;
    if(user.username && user.password) {
        next();        
    } else {
        res.status(400).json({ message: "Invalid username or password." })
    }
}


//ENDPOINTS
server.post('/api/register', allFields, (req, res) => {
    const user = req.body;
    user.password = passwordProtection(user.password);
    db.add(user)
        .then(response => {
            res.status(201).json({ message: "Account created successfully!" })
        })
        .catch(err => res.status(500).json({ message: "Unable to add new account." }))
});

server.post('/api/login', loginCheck, (req, res) => {
    const loginUser = req.body;
    db.login(loginUser.username)
        .then(response => {
            if(bcrypt.compareSync(loginUser.password, response.password) === true ){
                const token = generateToken(loginUser);
                res.status(200).json(token)
            } else {
                res.status(404).json({ message: "Invalid username or password" })
            }
        })
        .catch(err => res.status(500).json({ message: "Unable to login" }))
});

server.get('/api/users', (req, res) => {

});



//SERVER

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});