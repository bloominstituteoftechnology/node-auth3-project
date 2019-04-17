const express = require('express');
const router = express.Router();
const crypt = require('bcryptjs')
const restricted = require('../custom-middleware/restricted-middleware');

const db = require('../data/dbConfig.js');
const Users = require('../data/model')

const errors = { 
  '19':'Another entree has the same value no duplicates'
}

router.post('/register',(req,res)=>{
  let user = req.body;
  const hash = crypt.hashSync( req.body.password);
  user.password=hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
      .catch(error => {res.status(500).json(error)});
});

router.post('/login', (req, res) => {
  let { user, password } = req.body;
console.log (password)
  Users.findBy({ user })
    .first()
    .then(user => {  
      if (user && crypt.compareSync(password,user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.user}!, have a cookie` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/', restricted, (req, res) => {
  Users.find()
    
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});


module.exports = router;