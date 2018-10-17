const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	return res.send('user routes is working.');
});

module.exports = router;
