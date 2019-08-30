module.exports = department => {
  return function(req, res, next) {
    if (req.user) {
      if (
        req.user.department &&
        Array.isArray(req.user.department) &&
        req.user.department.includes(department)
      ) {
        next();
      } else {
        res
          .status(403)
          .json({ message: `oops, you don't get access to this!` });
      }
    } else {
      res.status(401).json({ message: `oops, you aren't logged in!` });
    }
  };
};
