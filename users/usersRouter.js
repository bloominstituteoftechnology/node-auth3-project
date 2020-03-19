const express = require("express");
const db = require("./userModel");
const restrict = require("../middleware/restrict");
const router = express.Router();

router.get("/", restrict(), async (req, res, next) => {
  try {
    res.status(200).json(await db.find());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
