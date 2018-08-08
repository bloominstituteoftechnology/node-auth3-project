const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const db = require('./data/db');


const server = express();

server.use(express.json());

server.use(morgan('dev'));


server.get('/', (req, res)=> {
	res.send('Testing123...');
});


server.post('/api/register', (req, res)=> {

        const credentials = req.body;
        const hash = bcrypt.hashSync(credentials.password, 14);  //hasing password using bcrypt
        credentials.password = hash;


        db('users')
        .insert(credentials)

        .then(ids =>{

                db('users')
                .where('id', ids[0])
                .first()
                .then(user => {

		const token = generateToken(user);
		
                res.status(200).json(user);
                })
        })

        .catch(err =>{
        if(err.message.includes('UNIQUE constraint failed: users.username')) res.status(500).json({errorMessage:"username already taken, use another username"});  //checking if the username is alread taken

        else res.status(500).json(err);
        });
});



const secret = 'jtq27utfvvbc90ndtwjuw';

function generateToken(user) {
  const payload = {
	  sub: user.id,
  };

  const options = {
    expiresIn: '2h',
    jwtid: 'u97487291',
  };

  return jwt.sign(payload, secret, options);
}

function protected (req, res, next){
	const token = req.headers.authorization;

	if (token) {
   	 jwt.verify(token, secret, (err, decodedToken) => {
      	
	if (err) {
           return res.status(401).json({ error: 'you shall not pass!! - token invalid' });
      	}

      req.jwtToken = decodedToken;
      next();
    });

  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' });
  }
}



server.post('/api/login', function(req, res) {
  const credentials = req.body;

  db('users')
    .where({ username: credentials.username })
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        // generating the token
        
	const token = generateToken(user);

        //token attached to the response
        
	  res.send(token);
      } else {
        return res.status(401).json({ error: 'Incorrect credentials' });
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});


server.get('/api/users', protected, (req, res) => {
  console.log('token', req.jwtToken);

  db('users')
    .then(users => {
      res.json(users);
    })
    
    .catch(err => res.send(err));
});


server.listen(4003, ()=> console.log('API running on port 4003'));
