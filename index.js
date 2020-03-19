const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('./auth/authRoute')
const userRouter = require('./users/userRouter')
const cookieParser = require('cookie-parser')


const server = express()

const port = process.env.Port || 5000 

server.use(cors())
server.use(helmet())
server.use(express())
server.use(cookieParser())



server.use('/api/users',userRouter)
server.use('/api/auth', authRouter)

server.use((error,req,res,next)=>{
   res.status(500).json({
      errorMessage: "Something is wrong"
   })
})
server.listen(port, ()=>{
   console.log( `Server running on ${port}`)
})

