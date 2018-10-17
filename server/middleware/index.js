const jwt = require('jsonwebtoken');

const secret = 'Fire&Ice%Luck*Misfortune(Peace$Fury)Light#Darkness!';

const tokenGenerator = (user) => {
  const payload = { username: user.username };
  const options = { expiresIn: '1m' };
  return jwt.sign(payload, secret, options);
};

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Not authorized' });
  }
};

module.exports.secret = secret;
module.exports.tokenGenerator = tokenGenerator;
module.exports.restricted = restricted;
