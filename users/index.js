const express = require('express');
const router = express.Router();
const db = require('../data/helpers/userDb');
const mw = require('../data/middleware/index');

// users
router.get('/', mw.protected, async (req, res) => {
    try {
        const records = await db.get();
        if (records) {
            res.status(200).json(records);
        } else {
            res.status(401).json({message: 'No Records Found'});
        }
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
});

module.exports = router;
