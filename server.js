const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./helpers/user_helpers.js');
const jwt = require('jsonwebtoken');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

function generateToken(user){
const payload = {...user,hello:'greeting!'};
const secret = 'osrs is cool';
const options = {expiresIn:"1m"};
return jwt.sign(payload, secret, options)
};

server.get('/',(req,res)=>{
res.send('working');
});

server.get('/api/users',(req,res)=>{
db.find()
	.then(data => {
	res.status(200).json(data);
	})
	.catch(err => {
	res.status(500).json(err);
	})
});

server.post('/api/register',(req,res)=>{
const { username,password } = req.body;
const hashed = bcrypt.hashSync(password,14);
db.add({username:username,password:hashed})
	.then(data => {
	res.status(200).json(data);
	})
	.catch(err => {
	res.status(500).json(err);
	})
})

server.post('/api/login',(req,res)=>{
const { username,password } = req.body;
db.login(username)
	.then(response => {
	if(bcrypt.compareSync(password, response.password)){
	const token = generateToken(response);
	res.status(200).json(token);}
	else{res.sendStatus('invalid username or password');}
	})
	.catch(err => {
	res.status(500).json(err);
	})
})



server.listen(3333, () => {console.log('\n server listening on port 3333 \n')});