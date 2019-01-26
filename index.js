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

// Generate Token // 
function generateToken(user) {
	const payload = {
		username: user.username,
	};
	const secret = 'Circles are Squares with infinite sides';
	const options = {
		expires: "1h",
		jwtid: '12345' // jtt
	};
	return jwt.sign(payload, secret, options);
	
}

// Use Middleware //
function protect(req, res, next){
 // Use JWT instead of Sessions
	const token = req.headers.authorization;
	jwt.verify(token, secret, (err, decodedToken) => {
		if(err){
			res.status(401).json({message: "You shouldn't be here"});
		} else {
			next();
		}
	});

}  

// Register Endpoint //
server.post('/api/register',(req,res) => {
	const deets = req.body;
	const hash = bcrypt.hashSync(deets.password,10);
	const password = hash;
	
	db('users')
		.insert(deets)
		.then(ids => {
			const id = ids[0];
			
			db('users')
				.where({ id })
				.first()
				.then(user => {
				
				const token = generateToken(user);
				res.status(201).json({ id: user.id, token });
			})
			.catch(err => 
				res.status(500).send(err))
		})
		.catch(err => 
			res.status(500).send(err)
		);	
		
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
	db.findUsers()
	.then(users => {
		res.json(users);
	})
	.catch(err => {
		res.status(500).send(err);
	})
});


// Listen //
server.listen(3300, () => console.log('\nrunning on port 3300\n'));
