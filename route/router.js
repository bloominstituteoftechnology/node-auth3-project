const route = require('express').Router();
const model = require('./model.js');
const bcrypt = require('bcryptjs');
const resrict = require('./restrict.js');
const jwt = require('jsonwebtoken');
const secret = require('../secrets.js');
const checkDepartment = require('../auth/departments.js');


function generateToken(user){

    const payload = {
        username: user.username,
        id: user.id,
        departments: user.departments
    };

    const options = {
        expiresIn: '1d',

    }

    return jwt.sign(payload, secret.jwtSecret, options);

}


// get users
route.get('/', resrict, checkDepartment('development'), (req, res) => {
    model.find()
    .then(users => {
        res.json({loggedinUser: req.username, users})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'err getting users'})
    })

})







// sign up user
route.post('/register', (req, res) => {
    
    const {username, password} = req.body;

    model.insert({username, password: bcrypt.hashSync(password, 2)})
          .then(id => {
              res.status(201).json({message: 'user registered', id});
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({err: 'err registering user'});
          });
});



// user login

route.post('/login', (req, res) => {
    
    const {username, password} = req.body;

    model.findByUserName({username})
          .first()
          .then(user => {
              if (user && bcrypt.compareSync(password, user.password)) {
                  const token = generateToken(user);
                  
                  res.status(200).json({message: 'you are logged in', token});
              } else {
                  res.status(401).json({err : 'invalid username or password'});
              }
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({err: 'err logging in user'});
          });
});





module.exports = route;