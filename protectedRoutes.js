const express = require("express");
const router = express.Router();
const dbFuncs = require("./dbFunctions");



router.get("/", async (req, res) => {
    // console.log(Object.keys(req));
    console.log(req.headers.authorization)
    try {
      const user = await dbFuncs.getUser(req.decodedToken);
      res.status(200).json({
		user,
		decodedToken: req.decodedToken,
	    });
    } catch (err) {
      console.log(err);
      return err;
    }
  });

router.get("/users", async (req, res) => {
try {
    const users = await dbFuncs.getUsers();
    res.status(200).json(users);
} catch (err) {
    console.log(err);
    return err;
}
});

module.exports = router;