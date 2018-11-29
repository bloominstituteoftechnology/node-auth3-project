const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { protected } = require('../middleware')
const db = require('../data/dbConfig');

const router = express();

const register = async (req, res) => {
  try {
    const creds = req.body
    
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    
    const userId = await db('users').insert(creds)
    console.log(userId)
    
    res.status(201).json({id: userId[0]})
  }
  catch(err) {
    res.status(500).json({
      err
    })
  }

}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['sales', 'marketing'], // this will come from the database
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1m',
  };

  return jwt.sign(payload, secret, options);
}

const login = (req, res) => {
  // grab username and password from body
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        // passwords match and user exists by that username
        // created a session > create a token
        // library sent cookie automatically > we send the token manually
        const token = generateToken(user);
        console.log('token', token)
        res.status(200).json({ message: 'welcome!', token });
      } else {
        // either username is invalid or password is wrong
        res.status(401).json({ message: 'you shall not pass!!' });
      }
    })
    .catch(err => res.json(err));
}
/*
const login = async (req, res) => {
  try {
    const creds = req.body
    
    console.log(creds)
    const user = await db('users').where({ username: creds.username }).first()
    const hash = bcrypt.hashSync(creds.password, 10);
    console.log(hash)
    console.log(user.password)

    if(user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user)
      res.status(201).json({token })
    } else {
      res.status(401).json({message: 'invalid creds'})
    }
  }
  catch(err) {
    res.status(500).json({err})
  }
}*/

const getUsers = async (req, res) => {
  try {
   
    const users = await db('users').select('id', 'username', 'password')

    res.status(201).json(users)
  }
  catch(err) {
    res.status(500).json({err})
  }
}


const test = (req, res) => {
  res.status(200)
    .json({
      message: 'up!'
    })
}
router.get('/', (req, res) => {
  res.status(200).json({message: 'api connected'})
})

router.post('/login',  login)
router.post('/register', register)
router.get('/users', protected, getUsers)

module.exports = router;