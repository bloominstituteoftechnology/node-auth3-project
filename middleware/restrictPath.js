const restrictPath = (path = '/api/restricted') => (req, res, next) => {
  console.log(req.path)
  if (req.path.slice(0, path.length) === path) {
    if (true) {
      next();
    } else {
      res.status(401).json({message: 'Session id is required to access restricted area.'})
    }
  } else {
    next();
  }
}
module.exports = restrictPath;