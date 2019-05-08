const router = require("express").Router();

const actions = require("./users");

router.route("/").get(async (req, res) => {
  const role = req.role;
  try {
    const users = await actions.getUsers(role);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong retrieving the users." });
  }
});

module.exports = router;
