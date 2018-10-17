const express = require('express');
const port = 5555;
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const knex = require('knex')

const dbConfig = require('./knexfile')
const db = knex(dbConfig.development)

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())
const secret = 'seecreettt';

function generateToken(user){

	const payload = {
		username: user.username,
		//roles: user.roles
		//could have default roles on the user
	};

	const options = {
		expiresIn: '1h',
		jwtid: '12345' //jti
	}

	return jwt.sign(payload, secret, options)
}

function protected(req, res, next){
	const token = req.headers.authorization

	if(token){
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				//token is invalid
				res.status(401).json({msg: "Invalid Token"})

			} else {
				//token is valid
				req.username = decodedToken.username;
				next()
			}
		});
	} else {
		res.status(401).json({msg: "no token provided"})
	}

}

server.post('/api/register', (req, res) => {
	const creds = req.body
	
	let e1 = '';
	let e2 = '';
	let bol = false;

	if (creds.password.length < 5){
		e1 = 'password must be 5 characters in length';
		bol = true;
	}

	if (creds.username.length < 5){
		e2 = 'username must be 5 characters in length';
		bol = true;
	}

	//if form not filled out correctly end and send error msg
	if (bol === true){
		res.status(400).json({error1: e1, error2: e2})
	}

	//if form is filled out correctly add user and give token
	if (bol === false){

		const hash = bcrypt.hashSync(creds.password, 10);
		creds.password = hash;

		db('users')
			.insert(creds)
			.then(ids => {
				const id = ids[0]
				
				db('users') 
					.where({id})
					.first()
					.then(user => {
						const token = generateToken(user);
						res.status(200).json({token})	
					})
					.catch(err => {
						console.log(err)
						res.status(500).json({msg: 'error generating token'})
					})
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({msg: "there was an error registering user"})
			})
	}
})

server.post('/api/login', (req, res) => {
	const creds = req.body;

	db('users')
		.where({username: creds.username})
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({token})
			} else {
				res.status(401).json({msg: 'You have failed to log in'})
			} 
		})

})

server.get('/api/users', protected, (req, res) => {

	db('users')
		.where({username: req.username})
		.first()
		.then(user => {
			const department = user.department
			db('users')
				.where('department', department )
				.then(filteredUsers => {
					res.status(200).json(filteredUsers)
				})
				.catch(error => {
					console.log(error)
					res.status(500).json({msg: 'error viewing users'})
				})
		})
})


server.get('/', (req, res) => {
	res.send('its working')
})


server.listen(port, () => console.log(`server running on port 5555`));


