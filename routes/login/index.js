const router = require("express").Router();
const bcrypt = require("bcryptjs");

const actions = require("./login");
const generateToken = require("../../auth/token-handlers").generateToken;

router.route("/").post(async (req, res) => {
  let { username, password } = req.body;
  if (username && password) {
    const user = await actions.findUser(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: "Welcome!", token });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } else {
    res
      .status(400)
      .json({ message: "Please provide the username and password." });
  }
});

module.exports = router;
