//Set Router. Import model/middleware.
const router = require('express').Router();

const db = require('./users-model.js');
const protect = require('../auth/protect-middleware.js');

// Get Users. **Postman Tested: **
router.get('/', protect, (req, res) => {
    db.getUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});


module.exports = router;