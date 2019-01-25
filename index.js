// Define dependancies //
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./data/dbHelpers.js');
const session = require('express-session');
// use jwt
const jwt = require('jsonwebtoken');

const server = express();

// Set up use's //
server.use(express.json());
server.use(cors());


// Use Middleware //
function protect(req, res, next){
 // Use JWT instead of Sessions
    if(req.session && req.session.userId){
        next();
    } else {
        res.status(500).send("Invalid Credentials");
    }
 
}  

// Register Endpoint //
server.post('/api/register',(req,res) => {
	const deets = req.body;
	const hash = bcrypt.hashSync(deets.password, 10);
	deets.password = hash;
	
	db('users')
		.insert(deets)
		.then(ids => {
			const id = ids[0];
			res.status(200).json(id);
		})
		.catch(err => res.status(500).send(err));
});

// Login Endpoint // 
server.post('/api/login',(req,res) => {
	const deets = req.body;
	
	db('users')
		.where({username: deets.username})
		.then(user => {
			if(user && bcrypt.compareSync(deets.password, user.password)){
				res.status(200).send("Hello " + user.username);
			} else {
				res.status(401).send({message: "You aint who you sez u are"});
			}
		})
		.catch(err => res.status(500).send(err));
});


// Users Endpoint //
server.get('/api/users', protect, (req, res) => {
    console.log('session', req.session);
    if(req.session && req.session.userId){
        db.findUsers()
            .then(users => {
                res.json(users);
        })
        .catch(err => {
            res.status(500).send(err);
        })
    } else {
        res.status(400).send('ACCESS DENIED');
    }
});


// Listen //
server.listen(3300, () => console.log('\nrunning on port 3300\n'));
