const router = require("express").Router();

const actions = require("./register");

router.route("/").post(async (req, res) => {
  const { username, password, department } = req.body;
  if (username && password && department) {
    try {
      const count = await actions.addUser({ username, password, department });
      if (count) {
        res.status(200).json({ message: "User successfully added." });
      } else {
        res.status(400).json({ message: "The user already exists." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong adding the new user." });
    }
  } else {
    res.status(400).json({
      message:
        "Please provide a username, password and department for registration."
    });
  }
});

module.exports = router;
