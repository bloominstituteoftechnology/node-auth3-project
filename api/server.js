const express = require('express')
const helmet = require('helment')
const cors = require('cors')
const authRouter = require('../auth/auth-router');
const userRouter = require('../user/user-router');



const server = express()





server.use(express.json());
server.use(helmet());
server.use(cors);

server.use('/api/auth', authRouter)
server.use('/api/user', userRouter)






server.get('/', (req,res) => {
    res.status(200).send('its working!')
})


