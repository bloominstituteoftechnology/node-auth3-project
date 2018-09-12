const jwt = require("jsonwebtoken"); 
const secret = "pair pare pear";
function generateToken(user) {
  const payload = {
    username: user.username, 
  }
  const options = {
      expiresIn: '1h',
      jwtid: '12345',//jti
  };
  return jwt.sign(payload, secret, options);
}

module.exports = generateToken; 