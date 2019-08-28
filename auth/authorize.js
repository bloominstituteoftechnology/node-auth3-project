const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (tokenHeader) {
    const [bearer, token] = tokenHeader.split(' ');
    console.log(bearer, token);
    if (bearer.toUpperCase() === 'BEARER' && token) {
      jwt.verify(
        token,
        process.env.LOGIN_SECRET || 'sooperdoopersecret',
        (err, decodedToken) => {
          if (err) {
            res
              .status(401)
              .json({ message: 'error verifying token', error: err });
          } else {
            req.decodedJWT = decodedToken;
            next();
          }
        }
      );
    } else {
      res
        .status(401)
        .json({ message: 'invalid scheme, or no token after scheme name.' });
    }
  } else {
    res.status(401).json({ message: 'missing Authorization header' });
  }
};
