// middleware for users constraints
function registerConstraints(req, res, next) {
  const USERNAME = req.body.username;
  const CLEARPASSWORD = req.body.password;
  const DEPARTMENT = req.body.department;

  if (!USERNAME || USERNAME.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'username'.`,
    });
  }

  if (USERNAME.length > 128) {
    return next({
      code: 400,
      error: `The 'username' must be fewer than 128 characters.`,
    });
  }

  if (!CLEARPASSWORD) {
    return next({
      code: 400,
      error: `Please provide a 'password' for the user.`,
    });
  }

  if (CLEARPASSWORD.length < 10) {
    return next({
      code: 400,
      error: `The 'password' of the user must be greater than 10 characters.`,
    });
  }

  if (!DEPARTMENT || DEPARTMENT.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'department' for the user.`,
    });
  }

  if (DEPARTMENT.length > 255) {
    return next({
      code: 400,
      error: `The 'department' of the user must be fewer than 255 characters.`,
    });
  }

  // set the req object
  req.USERNAME = USERNAME;
  req.CLEARPASSWORD = CLEARPASSWORD;
  req.DEPARTMENT = DEPARTMENT;

  next();
}

function loginConstraints(req, res, next) {
  const USERNAME = req.body.username;
  const CLEARPASSWORD = req.body.password;

  if (!USERNAME) {
    return next({
      code: 400,
      error: `Please provide a 'name' for the user.`,
    });
  }

  if (USERNAME.length > 128) {
    return next({
      code: 400,
      error: `The 'name' of the user must be fewer than 128 characters.`,
    });
  }

  if (!CLEARPASSWORD || CLEARPASSWORD.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'password' for the user.`,
    });
  }

  // set the req object
  req.USERNAME = USERNAME;
  req.CLEARPASSWORD = CLEARPASSWORD;

  next();
}

module.exports.registerConstraints = registerConstraints;
module.exports.loginConstraints = loginConstraints;
