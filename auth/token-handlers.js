const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  checkToken
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    role: user.department
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

function checkToken(token) {
  const secret = process.env.JWT_SECRET;

  return jwt.verify(token, secret, (err, decToken) => {
    if (err) {
      return false;
    } else {
      return decToken;
    }
  });
}
