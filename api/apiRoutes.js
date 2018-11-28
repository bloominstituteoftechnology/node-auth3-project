const express = require('express');
const bcrypt = require('bcryptjs')

const db = require('../data/dbConfig');

const router = express();

const register = async (req, res) => {
  try {
    const creds = req.body
    
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    
    const userId = await db('users').insert(creds)
    
    const user = await db('users').where({ userId })

    res.status(201).json(user)
  }
  catch(err) {
    res.status(500).json({
      message: 'There was an error',
      err
    })
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
router.post('/login', test)
router.post('/register', test)
router.get('/users', test)

module.exports = router;