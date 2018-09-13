const jwt = require("jsonwebtoken"); 
const secret = "pair pare pear";
function generateToken(user) {
  const payload = {
    username: user.username, 
    department: user.department,
  }
  const options = {
      expiresIn: '1h',
      jwtid: '12345',//jti
      subject: `${user.id}`
  };
  return jwt.sign(payload, secret, options);
}

module.exports = generateToken; 