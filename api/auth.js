const express = require('express');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('../jwtConfig');

const router = express.Router();

//create a new user
router.post('/register', (req, res) => {
  let { username, password, department } = req.body;
  if(!username || !password || !department) {
    return res.status(422).json({ message: 'Missing data' });
  }else{
    const hash = bcrypt.hashSync(password, 16);
    password = hash;
    db('users')
      .insert({ username, password, department })
      .then(ids => {
        const id = ids[0];
        db('users')
        .where({ id })
        .first()
        .then(user => {
          const token = jwt.generateToken(user);
          res.status(201).json({
                                username: user.username,
                                department: user.department,
                                token
                              });
        })
        .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
});

//login a user
router.post('/login', (req,res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if(!username || !password){
    return res.status(422).json({ message: 'A username and password is required' });
  }else{
    db('users')
      .where({ username })
      .first()
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
          const token = jwt.generateToken(user);
          res.status(200).json({
                                token,
                                username: user.username,
                                department: user.department
                              });
        }else if(!user){
          res.status(404).json({ message: 'Invalid Username' });
        }else{
          res.status(401).json({ message: 'You shall not pass' });
        }
      })
      .catch(err => res.status(500).json(err));
  }
});

module.exports = router;
