const express = require('express');
const server = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys')
const knexConfig = require('./knexfile');
const knex = require('knex');
const db = knex(knexConfig.development)
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()

//SERVER LISTENING
server.listen(8888, ()=> console.log(`Server listening on Port 8888`))
// ---

//SECRET
const jwtSecret = process.env.SECRET;

//GLOBAL MIDDLEWARE

server.use(cors());
server.use(express.json())
server.use(cookieSession({
    maxAge: '10m',
    secret: jwtSecret
}))

//PASSPORT DECLARATIONS
server.use(passport.initialize())
server.use(passport.session())


passport.serializeUser((user, done)=>{ //this will take a user object from the database. 
    console.log("Serialize User", user)
    done(null, user.googleID) //this should grab one piece of unique data from the user obj to be encrypted and added to a cookie. 
});

passport.deserializeUser((id, done)=>{
    console.log(id)
    db('google-users')
    .where({googleID: id})
    .then(user => { console.log("Deserialize User",user)
        done(null, user)
    })
    .catch(err => console.log('deserialize err:', err))
});



passport.use(new GoogleStrategy({
    callbackURL: 'http://localhost:8888/google/redirect',
    clientID: `${keys.google.clientId}`,
    clientSecret: keys.google.clientSecret,
    scope: ['profile']
},
(accessToken, refreshToken, profile, done)=>{
    console.log('ProfileID', profile.id)
    db('google-users').where({googleID: profile.id }).first()
.then(user => { 
    if(user){ console.log('find user success')
        done(null, user)
    }
    else{
        db('google-users').insert({username: profile.displayName, googleID: profile.id})
        .then(newUser =>{ console.log('add new user success', newUser)
            done(null, newUser )
        }).catch(err => console.log('insertUserError', err))  
    }
}).catch(err => { console.log('find user error', err)})
    

                 
}
))




//GOOGLE AUTHENTICATE
server.get('/signin/google', passport.authenticate('google', {scope: ['profile']}))

server.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    
    
    res.redirect('http://localhost:3000/users');
    
    
    res.status(200).json({message: req.user}) 
})
//--- END:PASSPORT DECLARATIONS





//TOKEN GENERATOR
const generateToken = (user) =>{
const payload = {
        username: user.username,
        department: user.department
    }
const options = {
    expiresIn: '20m'
}

return jwt.sign(payload, jwtSecret, options)
}

//MIDDLEWARE
function protected(req, res, next){
    let token = req.headers.authorization;
    let elTypo = typeof token;
        console.log("PASSPORT OBJECT \n",req.user)
        /* console.log("PASSPORT STRATEGIES \n",req._passport.instance.strategies) */
        
    
    if(token !== "null"){
        jwt.verify(token, jwtSecret, (err, decodedToken) =>{
            if(err){
                /* console.log('error', err) */
            res.status(500).json({message: 'Authentication error.'})
        }
            else{
                console.log('decodedtoken:',decodedToken)
                req.decodedToken = decodedToken

                next()
            }
        })
    
    }
    
    else{
        res.status(403).json({message: 'You are not authorized.'})
    }
}


//REGISTER
server.post('/api/register', (req, res) =>{
    let user = req.body;
    if(user.password && user.username){
        let hash = bcrypt.hashSync(user.password, 12)
        user.password = hash;
        db('users').insert(user)
        .then(user => {res.status(201).json({user})})
        .catch(err => res.status(500).json({message: 'Error occurred while retrieving data.'}))
    }
    else{
        res.status(401).json({message: "Please enter both a username and password."})
    }
    
})
//LOGIN
server.post('/api/login', async (req, res) =>{
    let {password, username} = req.body;
    
    try{

        let user = await db('users').where({username}).first();
        
        if(user && bcrypt.compareSync(password, user.password) ){
            let token = generateToken(user)
            res.cookie('jwt', token)
            res.status(200).json({message: `Welcome, ${user.username}!`, token})
        }
        else{
            res.status(401).json({ message: 'Authentication failed.' });
        }
        
    }
    catch(err){
        res.status(500).json({err})
    }
});
//USERS 
 server.get('/api/users', protected, (req, res)=>{

        db('users')
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({message: 'Error occurred.'}))
});

//LOGOUT
server.post('/api/logout', (req, res) =>{
    /* req.logout() //this is a passport method */
    res.status(200).json({message: 'See you next time!'})
})
