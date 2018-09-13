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

const secret='I see dead people.';

generateToken=(user)=>{
    const payload={
        username:user.username
    }
    const options={
        expiresIn:'24h',
        subject:user.id.toString()
    }
    return jwt.sign(payload,secret,options);
}
protected=(req,res,next)=>{
    const token=req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err,decodedToken)=>{
            if (err) {
                res.status(401).json({message:'invalid token.'})
            } else {
                req.username=decodedToken.username;
                next()
            };
        });
    } else {
        res.status(401).json({message:'no token provided'});
    }
}
server.post('/api/register',(req,res)=>{
    const newUser=req.body;
    const hash=bcrypt.hashSync(newUser.password,3);
    newUser.password=hash;

    db('user')
        .insert(newUser)
        .then(id=>{
            const userId=id[0];
            db('user')
                .where({id:userId})
                .then(res=>{
                    const token=generateToken(response);
                    res.status(201).json(token);
                })
                .catch(err=>res.status(500).json(err))
        })
        .catch(err=>res.status(500).json(err));
})
server.post('/api/login',(req,res)=>{
    const user=req.body;
    db('user')
        .where({username:user.username})
        .first()
        .then(response=>{
            if (response && bcrypt.compareSync(user.password,response.password)){
                const token=generateToken(response);
                res.status(200).json(token);
            } else {
                res.status(401).send('You shall not pass!');
            }
        })
        .catch(err=>res.status(500).send('You shall not pass!'))
})
server.get('/api/users', protected, (req,res)=>{
    if (req.username) {
        db('user')
            .select('username','password','department')
            .then(users=>res.status(200).json(users))
            .catch(err=>res.status(500).json(err));
    }
})
const port=9000;
server.listen(port,()=>console.log('Engines firing server starting new horizons venturing.'));