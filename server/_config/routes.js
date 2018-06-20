const userRoutes = require('../users/userRoutes');
const authRoutes = require('../auth/authRoutes');

module.exports = function(server) {
  // sanity check route
  server.get('/', function(req, res) {
    res.send({ api: 'What business do you have here?' });
  });

  server.use('/api/users', userRoutes);
  server.use('/api/auth', authRoutes);
};
