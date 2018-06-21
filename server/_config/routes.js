const userRoutes = require('../users/userRoutes');
const authRoutes = require('../auth/authRoutes');

module.exports = function(server) {
  // sanity check route
  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });

  server.use('/api/users', restricted, userRoutes);
  server.use('/api/auth', authRoutes);
};

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      // req.jwtPayload.decodedToken = decodedToken;
      if (err) {
        return res
          .status(401)
          .json({ message: 'you shall not pass! not decoded' });
      }

      next();
    });
  } else {
    res.status(401).json({ message: 'you shall not pass! no token' });
  }
}