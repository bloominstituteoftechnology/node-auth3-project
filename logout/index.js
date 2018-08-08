const express = require('express');
const router = express.Router();

// logout
router.get('/', async (req, res) => {
    try {
        res.status(200).json({message: 'Logout Successful'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
});

module.exports = router;
