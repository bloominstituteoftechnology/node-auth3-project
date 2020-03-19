const express = require('express')
const Users = require('./usersModel')


const router = express.Router()

router.get('/', async(req,res, next)=>{
   try{
      res.json(await Users.find())
   }
   catch(error){
      next(error)
   }
})

router.get('/', async (req, res, next)=>{

try{
   res.json(await Users.find()) //lists all users
}
catch(error) {
   next(error)
}
})




module.exports = router