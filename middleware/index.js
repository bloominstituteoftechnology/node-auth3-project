const jwt = require('jsonwebtoken');

// Custom Function for token generation
const jwtSecret = 'nobody tosses a dwarf!';
function generateToken(user) {
  const jwtPayload = {
    ...user,
    company: 'MyCorp',
    roles: 'admin',
  };

  const jwtOptions = {
    expiresIn: '3m',
  }

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
}

// CUSTOM MIDDLEWARE
function protected(req, res, next) {
  //authentication tokens are normally sent as a header instead of the body
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // token verification failed
        res.status(401).json({ message: 'invalid token'});
      } else {
        // token is valid
        req.decodedToken = decodedToken; // sub-agent middleware of route handler have access to this
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided'});
  }
}

module.exports.jwtSecret = jwtSecret;
module.exports.generateToken = generateToken;
module.exports.protected = protected;
