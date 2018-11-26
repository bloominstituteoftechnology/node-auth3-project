const jwt = require('jsonwebtoken');

module.exports = user => {
  const jwtPayload = {
    ...user
  };
  const jwtSecret = 'secret-code';
  const jwtOptions = {
    expiresIn: '60m'
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};
