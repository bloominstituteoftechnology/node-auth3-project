module.exports = (dept, req, res, next) => {
  console.log(req)
  return function (req, res, next) {
    if (req.decodedToken && req.decodedToken.department.includes(dept)) {
      next();
    } else {
      req.status(403).json({ message: "you don't have permission to access to this resource based on your role" })
    }
  }
}