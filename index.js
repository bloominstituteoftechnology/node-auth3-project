const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const server=express();
const configMiddleware=require('./config/middleware')(server);
const db=require('./database/dbconfig');

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
                .then(response=>{
                    const token=generateToken(response[0]);
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
            .where({username:req.username})
            .select('department')
            .then(dpmt=>{
                db('user')
                    .where({department:dpmt[0].department})
                    .then(users=>res.status(200).json(users))
                    .catch(err=>res.status(500).json(err))
            })
            .catch(err=>res.status(500).json(err));
    }
})
const port=9000;
server.listen(port,()=>console.log('Engines firing server starting new horizons venturing.'));