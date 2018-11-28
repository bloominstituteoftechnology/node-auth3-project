require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api', (req, res) => {
    res.send('Its Alive!');      
})

//USER REGISTER... INTO DATABASE 'USERS'
server.post('/api/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 1);
    credentials.password = hash;
    db('users').insert(credentials)
               .then(ids => {
                    res.status(201).json(ids);
                })
               .catch(err => res.send(err));
});

//FUNCTION TO GENERATE TOKEN WHICH WILL BE SAVED AT CLIENT END..
function generateToken(user) {
    const payload = {
          subject : user.id,
          username : user.username,
          roles : ['sales', 'admin'], //from database..
    };
    const secret = process.env.JWT_SECRET;

    const options = {
           expiresIn : '1h',
    };

    return jwt.sign(payload, secret, options);
}

//USER LOGIN...To check authenticated users
server.get('/api/login', (req, res) => {
        const credentials = req.body;
        db('users')
                .where({ username : credentials.username })
                .first()
                .then(user => {
                     if(user && bcrypt.compareSync(credentials.password, user.password)) {
                            const token = generateToken(user);
                            res.status(200).json({message : "Logged In", token});
                     } else {
                            res.status(401).json({message : "Invalid username or password.."})
                     }
                 })
                .catch(err => res.send({Message : "Error in Logging In..."}));
})

server.listen(3300, () => console.log('\nrunning on port 3300\n'));