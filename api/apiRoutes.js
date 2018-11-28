const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['sales', 'marketing']
  }
  const secret = proccess.env.JWT_SECRET;
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, secret, options)
}
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
}

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
router.post('/login', login)
router.post('/register', register)
router.get('/users', getUsers)

module.exports = router;