const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

module.exports = function(server) {
  server.get('/', function(req, res) {
    res.send({ api: 'What business do you have here?' });
  });

  server.use('/api/users', userRoutes);
  server.use('/api/auth', authRoutes);
};
