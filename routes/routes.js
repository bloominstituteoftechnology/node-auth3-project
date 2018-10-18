const express = require('express');
const data = require('../models/dataModel.js');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', (req, res)=>{
    res.status(200).json("It's alive!");
});

module.exports = router;