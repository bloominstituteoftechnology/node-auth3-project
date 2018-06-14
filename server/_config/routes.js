const userRoutes = require('../users/userRoutes');
const authRoutes = require('../auth/authRoutes');
const authLogin = require('../auth/loginRouter');

const helpers = require('../tools/helperFunctions');

module.exports = function(server) {
  // sanity check route
  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });

  server.use('/api/auth', authRoutes);
  server.use('/api/auth', authLogin);

  // Use for 'restricted' endpoints the Token Validator middleware
  server.use(helpers.userHasToken);
  server.use('/api/users', userRoutes);
};
