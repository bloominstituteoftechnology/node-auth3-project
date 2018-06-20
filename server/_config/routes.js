const userRoutes = require('../users/userRoutes');
const authRoutes = require('../auth/authRoutes');

const jwt = require("jsonwebtoken");
const secret = "You're a wizard, Harry"

module.exports = function(server) {
  // sanity check route
  server.get('/', function(req, res) {

    res.send({ api: 'up and running' });
  });
  
  //add helper function to restrict what people can access

  const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          return res
            .status(401)
            .json({ message: 'you shall not pass! not decoded', err });
        } next();
      });

    } 
    else{
      res.send({message: "No token for you."})
    }
  }


  server.use('/api/users', restricted, userRoutes); //this is where restricted will go when it works
  server.use('/api/auth', authRoutes);
};
