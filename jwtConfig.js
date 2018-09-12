const jwt = require('jsonwebtoken');
const SECRET = 'part and parcel';

const config = {
  generateToken: function(user) {
    const payload = {
      username: user.username,
      department: user.department,
      id: user.id
    };
    const options = {
      expiresIn: '1hr',
      jwtid: '1234'
    };
    return jwt.sign(payload, SECRET, options);
  },//end of generateToken
  protected: function(req, res, next) {
    const token = req.headers.authorization;
    if(token){
      jwt.verify(token, SECRET, (err, decodedToken) => {
        if(err){
          console.log(err);
          res.status(401).json({ message: 'Invalid Token' });
        }else{
          next();
        }
      });
    }else{
      res.status(401).json({ message: 'No token present' });
    }
  },//end of protected
}

module.exports = config;
