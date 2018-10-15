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
					res.status(201).json({id: user.id, token})	
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
				res.status(401).json({msg: 'failed login'})
			} 
		})

})

server.get('/api/users', protected, (req, res) => {
	//return console.log(req.username);
	db('users')
		.where({username: req.username})
		.first()
		.then(user => {
			if (user.username === 'marshall'){
				console.log('your in marshall')
				console.log(jwt)
				db('users')
					.then(response => {
						res.status(200).json(response)
					})
					.catch(error => {
						console.log(error)
						res.status(500).json({msg: 'error viewing users'})
					})
			} else {
				res.status(401).json({msg: 'not permited to view users'})
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'there was an error'})
		})
})


server.get('/', (req, res) => {
	res.send('its working')
})


server.listen(port, () => console.log(`server running on port 5555`));


