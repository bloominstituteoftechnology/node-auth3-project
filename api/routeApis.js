require('dotenv').config();
const route = require('express')()
const db = require('../database/dbConfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// const protected = (req, res, next)=> {
//     if(req.session && req.session.userID){
//         next();
//     } else{
//         res.status(401).json({message : "Log in required"})
//     }
// }

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      roles: ['sales', 'marketing'], // this will come from the database
    };
  
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: '10m',
    };
  
    return jwt.sign(payload, secret, options);
  }
  

const login = (req, res, next) => {
    const creds = req.body;


    db('users')
        .where({username : creds.username})
        .first()
        .then(user => {
   
            if(user && bcrypt.compareSync(creds.password, user.password)){

                const token = generateToken(user);
  
                res.status(200).json({message: "Login Successful!", token})
            }
            else{res.status(401).json({message : "You shall not PASS !!"})}
        })
        
        .catch((err)=>  res.status(500).json({ message: 'could not login', err }))
}; 


// register a new user
// hash password before saving to DB
const registerUser = (req, res, next) => {
    
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 3);

    newUser.password = hash;

    db('users')
        .insert(newUser)
        .then(ids =>{res.status(200).json(ids)})
        .catch((err)=>
        res.status(500).json({ message: 'could not add', err }))
};

const getUsers = (req, res, next) => {

    db('users')
        .select('*')
        .then(users =>{res.status(200).json(users)})
        .catch((err)=>
 res.status(500).json({ message: 'could not get users', err }))
};



route.get('/', (req, res) => {
    res.send("route is RUNNING !");
})


// Register
route.post('/register', registerUser)
// GET USERS
route.get('/users', getUsers)
// LOGIN
route.post('/login', login)






module.exports = (server) => {
/*    for restricted url, apply middleware.  
    server.use('api/restricted', protectedFunc);
    server.use('api/restricted', protectRoute;
*/

    server.use('/api', route)
  }


