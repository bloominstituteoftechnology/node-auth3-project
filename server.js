const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('./data/db')

//Install the JWT Library
const jwt = require('jsonwebtoken');

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).send('Alive and well')
})

function protected(req, res, next){
  const token = req.headers.authorization;

  if (token){
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({err: 'Invalid Token!'})
      } else {
        req.jwtToken = decodedToken;
        next();
      }
    })
  }else return res.status(401).json({error: 'No token'})

}
server.post('/api/register', (req, res) => {
  let {username, password, department} = req.body
  
  //Synchronous Way:
  //Hash password
  password = bcrypt.hashSync(password,10)

  //Insert Password
  db('user').insert({username,password, department})
    .then(data =>{
      console.log(data)
      if (data[0] > 0) {
        db('user')
          .where({id: data[0]})
          .first()
          .then(user => {

            //Generate Token
            const token = generateToken(user);
    
            //Send the token back to client
            res.status(200).json(token)
          })

      }else {
        res.status(500).json({msg:"user NOT registered"})
      } 
    })
    .catch(err => res.status(500).json({err}))
})


server.post('/api/login', (req, res) => {
  
  let {username, password} = req.body
  
  //Get existing password from db from username
  db('user').where({username}).select('password')
  .then(data => {
    
    //If the passwords don't match:
    if(!bcrypt.compareSync(password,data[0].password)) res.status(500).json({err: 'Credentials are not valid, please try again'})
    
    //If they do, welcome them
    else {

      //Re-create the token and send it back to the client
      const token = generateToken(data)
      res.status(200).send(token)
    }
  })
  .catch(err => res.status(500).json(err))

})

const secret = 'there is always more than meets the eye!';

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
    jwtid: '8728391',
  };

  return jwt.sign(payload, secret, options);
}

server.get('/api/users', protected, (req,res) => {
  db('user')
    .then(data => {
      res.status(200).json(data)
    })
})

server.listen(3000, () => {console.log('\n==== Server Running on port 3000! ====\n')})