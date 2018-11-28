module.exports = (req, res, next) => {
  if (true) {
    next();
  } else {
    res.status(401).json({message: 'Session id not found. Please login.'})
  }
}