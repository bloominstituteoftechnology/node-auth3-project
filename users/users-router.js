const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware')
 
router.get('/' , restricted , (req, res) => {
    const deps = (Users.findDept())
    console.log(req.body.department, "8888",deps)
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  


  router.get('/dept', restricted,(req,res)=> {
      const token = req.decodedJwt.department;
      Users.findDept(token)
      .then(user => {
        res.status(200).json(user)

      })
      .catch(err => res.send(err));
      console.log(token)
     //  .first()
    

     
  })
  module.exports = router;
  