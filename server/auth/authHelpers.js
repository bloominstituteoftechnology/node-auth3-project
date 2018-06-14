const jwt = require('jsonwebtoken');
const mySecret = require('../settings').secret;

const generateToken = user => {
  const payload = {
    name: user.username,
    race: user.race
  };
  const secret = mySecret;
  const options = {
    expiresIn: '1h'
  };
  // Returning signed token
  return jwt.sign(payload, secret, options);
}

const verifyToken = token => {
  return jwt.verify(token, mySecret, function(err, decodedToken) {
    if (err) {
      console.log("@verifyToken - Error:",err);
      return false;
    }
    return decodedToken;
  });
}

module.exports = {
  generateToken,
  verifyToken
}