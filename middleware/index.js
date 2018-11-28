module.exports = {
  configureMiddleware: require('./middleware'),
  protected: require('./protectedMW'),
  restrictPath: require('./restrictPath')
}