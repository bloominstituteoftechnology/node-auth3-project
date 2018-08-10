const jwt = require("jsonwebtoken");
const secret = "hi poof";

function protected(req, res, next) {
  const token = req.headers.authorization;
  console.log("header is: ", req.headers);
  console.log("token is: ", token);

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "invalid token" });
      }
      req.jwtToken = decodedToken;
      console.log("req.jwtToken: ", req.jwtToken);
      next();
    });
  } else {
    return res.status(401).json({ error: "no token provided. " });
  }
}

function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: "2h",
    jwtid: "183792"
  };
  return jwt.sign(payload, secret, options);
}

exports.protected = protected;
exports.generateToken = generateToken;
