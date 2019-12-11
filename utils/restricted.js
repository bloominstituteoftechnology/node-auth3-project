const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (req.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedJwt) => {
      if (err) {
        res.status(401).json({ message: "You shall not pass!" });
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    })
  } else {
    res.status(401).json({ message: "You shall not pass!" });
  }
}; 