const express=require('express');
const morgan=require('morgan');
const helmet=require('helmet');
const bcrypt=require('bcryptjs');
const knex=require('knex');
const knexConfig=require('./knexfile');
const cors=require('cors');
const db=knex(knexConfig.development);
const jwt=require('jsonwebtoken');
const server=express();

server.use(morgan('dev')).use(helmet()).use(cors()).use(express.json());

generateToken=(user)=>{
    const payload={
        username:user.username
    }
    const secret='I see dead people.'
    const options={
        expiresIn:'24h',
        jwtid:'666'
    }
    return jwt.sign(payload,secret,options);
}
server.post('/api/register',(req,res)=>{
    const newUser=req.body;
    const hash=bcrypt.hashSync(newUser.password,3);
    newUser.password=hash;

    db('user')
        .insert(newUser)
        .then(id=>res.status(201).json(id[0]))
        .catch(err=>res.status(500).json(err));
})

const port=9000;
server.listen(port,()=>console.log('Engines firing server starting new horizons venturing.'));