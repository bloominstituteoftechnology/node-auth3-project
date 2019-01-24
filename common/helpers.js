require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
   // protected middleware is like a lock and the token will be the key to unlock it
   protected: (req, res, next) => {
      // the auth token is normally sent in the Authorization header
      const token = req.headers.authorization;

      if (token) {
         jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
               res.status(error.unauthorized).json({
                  message: 'Invalid token',
               });
            } else {
               req.decodedToken = decodedToken;
               next();
            }
         });
      } else {
         res.status(error.unauthorized).json({ message: 'No token provided' });
      }
   },

   generateToken: user => {
      const payload = {
         username: user.username,
         password: user.password,
         name: user.name,
         department: user.department,
      };

      const secret = process.env.JWT_SECRET;

      const options = {
         expiresIn: '10m', // expires after 10 minutes total
      };

      return jwt.sign(payload, secret, options);
   },
};
