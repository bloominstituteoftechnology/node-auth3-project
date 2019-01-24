//create router
const express = require('express');
const router = express.Router();

//grab helper functions
const usersDb = require('../data/helpers');

//import bcryptjs for hashing
const bcrypt = require('bcryptjs');
//import jsonwebtoken 
const jwt = require('jsonwebtoken');


//**TOKEN GENERATOR FUNCTION */
const secret = 'williewonka';  //placed in global for use in verification middleware
function tokenGenerator(user){
    const payload = {
        username: user.username,
        department: user.department
    }
    
    const options = {
        expiresIn: '1h',
        jwtid: '12345'  //jti
    }
    
    return jwt.sign(payload, secret, options);
}

//***VERIFICATION OF TOKEN MIDDLEWARE**** */
function verifyUser(req, res, next){
    //read token string from authorization header
    //if user not logged in there will be no token
    const token = req.headers.authorization;

    if(token){
        //verify the token
        jwt.verify(token, secret, (err, decodedToken) =>{
            if(err){
                res.status(401).json({error: "Invalid Token"})
            }else{
                next();
            }
        })
    } else{
        res.status(401).json("No Token Provided")
    }

}

//**ROUTE HANDLERS/ENDPOINTS FOR APPLICATION */
//REGISTER USER
router.post('/register', (req, res) =>{
    const credentials = req.body;
    const hashedPW = bcrypt.hashSync(credentials.password, 8);
    credentials.password = hashedPW;

    usersDb.addUser(credentials)
    .then(ids =>{
        const id = ids[0];
        usersDb.getUserById(id)
            .then(user =>{
                //generate token
                const token = tokenGenerator(user);
                //pass token to client
                res.status(201).json({userId: id, token: token});
            })
            .catch(err =>{
                res.status(500).json({error: 'Unable to add user'});
            })
        
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to add user"})
    })
})

//LOGIN USER
router.post('/login', (req, res) =>{
    const credentials = req.body;

    usersDb.getUserByUsername(credentials.username)
    .then(user =>{
        if(user && bcrypt.compareSync(credentials.password, user.password)){
            //generate token
            const token = tokenGenerator(user);
            //pass token to client
            res.status(200).json({userId: user.id, msg: 'Login Successful',token: token, })
        }else{
            res.status(401).json({error: "Unable to verify user"})
        }
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to log in"})
    })
})




//GET ALL USERS
router.get('/users', verifyUser, (req,res) =>{
    usersDb.getUsers()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to get users"})
    })
})



module.exports = router;
    