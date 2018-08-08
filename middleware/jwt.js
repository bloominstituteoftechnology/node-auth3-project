const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

// get my env secrets
require('dotenv').config();
const SECRET = process.env.SECRET;

function jwtRoute(req, res, next) {
  // res.header('x-authorization', 'Bearer ' + token);
  console.log('headers.authorization', req.headers.authorization);
  const token = req.headers.authorization;

  if (token) {
    // strip "Bearer "
    const actual = token.substring(7);
    jwt.verify(actual, SECRET, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: 'you shall not pass!! - token invalid' });
      }

      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' });
  }
}

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
    jwtid: uuid(),
  };

  return jwt.sign(payload, SECRET, options);
}

module.exports.jwtRoute = jwtRoute;
module.exports.generateToken = generateToken;
