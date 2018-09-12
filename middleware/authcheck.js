const secret = require("../config.js");
const jwt = require("jsonwebtoken");
const dbhelpers = require("../dbhelpers/helpers");

module.exports = function(req, res, next) {
  if (!req.header("Authorization")) {
    return res.status(401).json({ error: "You shall not pass!" });
  } else {
    jwt.verify(
      req.header("Authorization"),
      secret.secret,
      async (err, decoded) => {
        if (err) {
          console.log(err);
          return;
        }
        const user = await dbhelpers.userCheck(decoded.user);
        if (user[0].id) {
          res.locals.signedin = true;
          next();
        } else {
          return res.status(401).json({ error: "You shall not pass!" });
        }
      }
    );
  }
};
