const express = require('express')
const bcrypt = require('bcryptjs')
const Users = require('../users/usersModel')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/register', async(req, res, next)=>{
   try{
      
      const {username} = req.body
      console.log(username)
      const user = await Users.findBy({username}).first()
      console.log(user)
      if(user){
         return res.status(409).json({
            message: 'Username is already taken'
         })// if username is used gives error message
      }
      res.status(201).json(await Users.add(req.body))//registers the user
   }
   catch(error){
      next(error)
   }
})

router.post('/login', async(req, res, next)=>{
   const authError ={
      message: 'Invalid Credentials'
   }
   try{
      const {username,password} = req.body

      const user = await Users.findBy({username}).first()
      if(!user){
         return res.status(401).json(authError)// if no user 
      }

      const passwordValid = await bcrypt.compare(password, user.password)
      if(!passwordValid){
         return res.status(401).json(authError)
      }
      const payload = {
         userId: user.userId,
         department: "departments"
      }
      const token = jwt.sign(payload)
      res.cookie = ('token', token)
      res.json({
         message: `Welcome ${user.username}`
      })
     }
   catch(error){
      next(error)
   }
})
module.exports = router